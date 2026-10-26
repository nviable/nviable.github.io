-- D1 Schema for Apple Store Stock Tracking & Restock History

CREATE TABLE IF NOT EXISTS stock_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  store_number TEXT NOT NULL,
  store_name TEXT NOT NULL,
  part_number TEXT NOT NULL,
  product_title TEXT NOT NULL,
  is_available INTEGER NOT NULL,
  is_restock INTEGER NOT NULL DEFAULT 0,
  pickup_quote TEXT,
  reservation_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_stock_time ON stock_checks(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_stock_store_part ON stock_checks(store_number, part_number, id DESC);
CREATE INDEX IF NOT EXISTS idx_stock_restock ON stock_checks(is_restock);
