/**
 * Apple Store Stock Checker Service for iPhone Duo
 * Targets Upstate NY stores near 14623:
 * - R140: Apple Eastview (Victor/Rochester)
 * - R016: Apple Walden Galleria (Buffalo)
 * - R107: Apple Syracuse (Destiny USA)
 */

export interface PartInfo {
  partNumber: string;
  productTitle: string;
  title: string;
  storePickupQuote: string;
  quote: string;
  pickupDisplay: string;
  pickupSearchQuote: string;
  buyUrl: string;
  isAvailable: boolean;
  available: boolean;
}

export interface StoreStock {
  storeNumber: string;
  storeName: string;
  city: string;
  state: string;
  distance: string;
  distanceWithUnit: string;
  reservationUrl: string;
  parts: Record<string, PartInfo>;
  anyAvailable: boolean;
}

export interface StockCheckResult {
  success: boolean;
  timestamp: string;
  location: string;
  stores: StoreStock[];
  error?: string;
}

export interface RestockEvent {
  id?: number;
  timestamp: string;
  store_number: string;
  store_name: string;
  part_number: string;
  product_title: string;
  is_available: number;
  is_restock: number;
  pickup_quote?: string | null;
  reservation_url?: string | null;
}

export const TARGET_STORES = [
  { id: "R140", name: "Apple Eastview", city: "Victor (Rochester)", state: "NY" },
  { id: "R016", name: "Apple Walden Galleria", city: "Buffalo", state: "NY" },
  { id: "R107", name: "Apple Syracuse", city: "Syracuse", state: "NY" },
];

export const TARGET_PARTS = [
  { sku: "MK1F4LL/A", name: "iPhone Duo 256GB Night Sky" },
  { sku: "MK1G4LL/A", name: "iPhone Duo 512GB Star White" },
  { sku: "MK1H4LL/A", name: "iPhone Duo 512GB Night Sky" },
];

export const TARGET_LOCATION = "14623";

/**
 * Fetch raw stock data from Apple Retail pickup endpoint
 */
export async function fetchAppleStock(): Promise<StockCheckResult> {
  const partsParams = TARGET_PARTS.map((p, idx) => `parts.${idx}=${encodeURIComponent(p.sku)}`).join("&");
  const url = `https://www.apple.com/shop/retail/pickup-message?pl=true&location=${TARGET_LOCATION}&${partsParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.apple.com/shop/buy-iphone",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Apple endpoint returned HTTP ${response.status}`);
    }

    const data: any = await response.json();
    const rawStores: any[] = data?.body?.stores || [];

    const targetStoreIds = new Set(TARGET_STORES.map((s) => s.id));
    const matchedStores = rawStores.filter((s: any) => targetStoreIds.has(s.storeNumber));

    const stores: StoreStock[] = matchedStores.map((store: any) => {
      const parts: Record<string, PartInfo> = {};
      let anyAvailable = false;

      for (const targetPart of TARGET_PARTS) {
        const p = store.partsAvailability?.[targetPart.sku];
        const isAvailable = p?.pickupDisplay === "available";
        if (isAvailable) anyAvailable = true;
        const title = p?.messageTypes?.regular?.storePickupProductTitle || targetPart.name;
        const quote = p?.messageTypes?.regular?.storePickupQuote || p?.storePickupQuote || p?.pickupSearchQuote || "Unavailable";

        parts[targetPart.sku] = {
          partNumber: targetPart.sku,
          productTitle: title,
          title,
          storePickupQuote: quote,
          quote,
          pickupDisplay: p?.pickupDisplay || "unavailable",
          pickupSearchQuote: p?.pickupSearchQuote || "",
          buyUrl: p?.buyUrl || `https://www.apple.com/shop/buy-iphone`,
          isAvailable,
          available: isAvailable,
        };
      }

      const dist = store.storeDistanceWithUnit || store.storedistanceWithUnit || store.distanceWithUnit || "";

      return {
        storeNumber: store.storeNumber,
        storeName: store.storeName,
        city: store.city,
        state: store.state,
        distance: dist,
        distanceWithUnit: dist,
        reservationUrl: store.reservationUrl || `https://www.apple.com/retail/${store.storeName.toLowerCase().replace(/\s+/g, '')}`,
        parts,
        anyAvailable,
      };
    });

    // Ensure sorted order: Rochester (R140), Buffalo (R016), Syracuse (R107)
    const storeOrder = ["R140", "R016", "R107"];
    stores.sort((a, b) => {
      const idxA = storeOrder.indexOf(a.storeNumber);
      const idxB = storeOrder.indexOf(b.storeNumber);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      return 0;
    });

    return {
      success: true,
      timestamp: new Date().toISOString(),
      location: TARGET_LOCATION,
      stores,
    };
  } catch (err: any) {
    return {
      success: false,
      timestamp: new Date().toISOString(),
      location: TARGET_LOCATION,
      stores: [],
      error: err?.message || "Failed to fetch Apple stock",
    };
  }
}

/**
 * Record stock check results to Cloudflare D1 database and detect restocks
 */
export async function recordStockCheckToD1(
  db: any,
  result: StockCheckResult,
  webhookUrl?: string
): Promise<{ restocks: RestockEvent[] }> {
  if (!db || !result.success || !result.stores.length) {
    return { restocks: [] };
  }

  const detectedRestocks: RestockEvent[] = [];
  const insertStatements: any[] = [];

  for (const store of result.stores) {
    for (const targetPart of TARGET_PARTS) {
      const part = store.parts[targetPart.sku];
      if (!part) continue;

      const isCurrentAvailable = part.isAvailable ? 1 : 0;

      // Check previous availability in D1
      let wasAvailable = 0;
      let hasPriorRecord = false;
      try {
        const lastCheck = await db
          .prepare(
            "SELECT is_available FROM stock_checks WHERE store_number = ? AND part_number = ? ORDER BY id DESC LIMIT 1"
          )
          .bind(store.storeNumber, targetPart.sku)
          .first();

        if (lastCheck) {
          hasPriorRecord = true;
          wasAvailable = Number(lastCheck.is_available);
        }
      } catch (e) {
        console.warn("D1 query failed for last check:", e);
      }

      // Restock triggered when transitioning from 0 (unavailable) to 1 (available)
      const isRestock = isCurrentAvailable === 1 && (!hasPriorRecord || wasAvailable === 0) ? 1 : 0;

      const event: RestockEvent = {
        timestamp: result.timestamp,
        store_number: store.storeNumber,
        store_name: store.storeName,
        part_number: targetPart.sku,
        product_title: part.productTitle,
        is_available: isCurrentAvailable,
        is_restock: isRestock,
        pickup_quote: part.storePickupQuote,
        reservation_url: store.reservationUrl,
      };

      if (isRestock === 1) {
        detectedRestocks.push(event);
      }

      insertStatements.push(
        db
          .prepare(
            `INSERT INTO stock_checks 
            (timestamp, store_number, store_name, part_number, product_title, is_available, is_restock, pickup_quote, reservation_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            event.timestamp,
            event.store_number,
            event.store_name,
            event.part_number,
            event.product_title,
            event.is_available,
            event.is_restock,
            event.pickup_quote,
            event.reservation_url
          )
      );
    }
  }

  // Batch insert into D1
  if (insertStatements.length > 0) {
    try {
      await db.batch(insertStatements);
    } catch (err) {
      console.error("D1 batch insert error:", err);
    }
  }

  // If webhook is provided and restocks were detected, send notification
  if (webhookUrl && detectedRestocks.length > 0) {
    try {
      for (const restock of detectedRestocks) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `🚨 **In Stock!** ${restock.product_title} is available at **Apple ${restock.store_name}**!\nReserve: ${restock.reservation_url || "https://www.apple.com/shop/buy-iphone"}`,
          }),
        });
      }
    } catch (webhookErr) {
      console.error("Webhook notification error:", webhookErr);
    }
  }

  return { restocks: detectedRestocks };
}

/**
 * Fetch restock history from Cloudflare D1
 */
export async function getD1RestockHistory(db: any, limit = 50): Promise<RestockEvent[]> {
  if (!db) return [];
  try {
    const { results } = await db
      .prepare(
        `SELECT id, timestamp, store_number, store_name, part_number, product_title, is_available, is_restock, pickup_quote, reservation_url
         FROM stock_checks
         WHERE is_restock = 1
         ORDER BY id DESC
         LIMIT ?`
      )
      .bind(limit)
      .all();

    return (results as RestockEvent[]) || [];
  } catch (err) {
    console.warn("Failed to fetch restock history from D1:", err);
    return [];
  }
}

/**
 * Fetch recent checks (including negative checks) from Cloudflare D1
 */
export async function getD1RecentChecks(db: any, limit = 60): Promise<RestockEvent[]> {
  if (!db) return [];
  try {
    const { results } = await db
      .prepare(
        `SELECT id, timestamp, store_number, store_name, part_number, product_title, is_available, is_restock, pickup_quote, reservation_url
         FROM stock_checks
         ORDER BY id DESC
         LIMIT ?`
      )
      .bind(limit)
      .all();

    return (results as RestockEvent[]) || [];
  } catch (err) {
    console.warn("Failed to fetch recent checks from D1:", err);
    return [];
  }
}
