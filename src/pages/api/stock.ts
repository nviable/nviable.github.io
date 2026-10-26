import type { APIRoute } from 'astro';

export const prerender = false;

export interface StockStore {
  storeNumber: string;
  storeName: string;
  city: string;
  state: string;
  distance: string;
  reservationUrl: string;
  parts: Record<
    string,
    {
      title: string;
      available: boolean;
      pickupDisplay: string;
      quote: string;
    }
  >;
}

export interface StockHistoryItem {
  id: string;
  timestamp: string;
  storeNumber: string;
  storeName: string;
  city: string;
  partNumber: string;
  productTitle: string;
  available: boolean;
  type: 'restock' | 'stockout' | 'check';
  reservationUrl: string;
}

const DEFAULT_ZIP = '14623';
const TARGET_STORE_NUMBERS = ['R140', 'R016', 'R107']; // Eastview (Rochester), Walden Galleria (Buffalo), Syracuse

const DEFAULT_PARTS: Record<string, string> = {
  'MK1F4LL/A': 'iPhone Duo 256GB Night Sky',
  'MK1G4LL/A': 'iPhone Duo 512GB Star White',
  'MK1H4LL/A': 'iPhone Duo 512GB Night Sky',
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const zip = url.searchParams.get('zip') || DEFAULT_ZIP;
  const customParts = url.searchParams.get('parts');
  
  const partsToQuery = customParts
    ? customParts.split(',').map((p) => p.trim()).filter(Boolean)
    : Object.keys(DEFAULT_PARTS);

  const queryParams = new URLSearchParams({
    pl: 'true',
    location: zip,
  });

  partsToQuery.forEach((part, index) => {
    queryParams.set(`parts.${index}`, part);
  });

  const appleUrl = `https://www.apple.com/shop/retail/pickup-message?${queryParams.toString()}`;

  try {
    const res = await fetch(appleUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: `Apple API returned status ${res.status}`,
          status: 'error',
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data: any = await res.json();
    const rawStores = data.body?.stores || [];

    // Filter to target stores (or top 3 closest if target stores not in list)
    let filteredStores = rawStores.filter((s: any) =>
      TARGET_STORE_NUMBERS.includes(s.storeNumber)
    );

    // If specific target stores aren't found in a different zip query, show the closest 3
    if (filteredStores.length === 0 && rawStores.length > 0) {
      filteredStores = rawStores.slice(0, 3);
    }

    // Sort to keep Rochester first, then Buffalo, then Syracuse
    filteredStores.sort((a: any, b: any) => {
      const idxA = TARGET_STORE_NUMBERS.indexOf(a.storeNumber);
      const idxB = TARGET_STORE_NUMBERS.indexOf(b.storeNumber);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      return 0;
    });

    const stores: StockStore[] = filteredStores.map((s: any) => {
      const partsResult: StockStore['parts'] = {};
      const partsAvail = s.partsAvailability || {};

      for (const partNum of partsToQuery) {
        const item = partsAvail[partNum];
        const title =
          item?.messageTypes?.regular?.storePickupProductTitle ||
          DEFAULT_PARTS[partNum] ||
          partNum;
        const pickupDisplay = item?.pickupDisplay || 'unavailable';
        const available = pickupDisplay === 'available';
        const quote =
          item?.messageTypes?.regular?.storePickupQuote ||
          item?.pickupSearchQuote ||
          '';

        partsResult[partNum] = {
          title,
          available,
          pickupDisplay,
          quote,
        };
      }

      return {
        storeNumber: s.storeNumber,
        storeName: s.storeName,
        city: s.city,
        state: s.state,
        distance: s.storeDistanceWithUnit || s.distanceWithUnit || '',
        reservationUrl: s.reservationUrl || `https://www.apple.com/retail/${s.storeName.toLowerCase().replace(/\s+/g, '')}`,
        parts: partsResult,
      };
    });

    return new Response(
      JSON.stringify({
        status: 'ok',
        zip,
        timestamp: new Date().toISOString(),
        stores,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60, s-maxage=60',
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: err?.message || 'Failed to check Apple inventory',
        status: 'error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
