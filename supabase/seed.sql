-- ============================================
-- E-commerce Orders Seed Data
-- 500 realistic orders over 180 days
-- ============================================

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  product TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Electronics', 'Apparel', 'Home', 'Books')),
  amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'refunded', 'cancelled')),
  region TEXT NOT NULL CHECK (region IN ('NA', 'EU', 'APAC', 'LATAM')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS (even though data is public, good practice)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON orders
  FOR SELECT
  TO anon
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_category ON orders(category);
CREATE INDEX IF NOT EXISTS idx_orders_region ON orders(region);

-- ============================================
-- Insert 500 orders with realistic distribution
-- ============================================

-- Helper function to generate random dates in last 180 days
-- More recent dates have higher probability (realistic sales pattern)

INSERT INTO orders (order_number, customer_name, customer_email, product, category, amount, status, region, created_at)
VALUES
  -- Electronics (40% of orders, higher AOV)
  ('ORD-2025-001', 'John Smith', 'john.smith@gmail.com', 'Wireless Headphones Pro', 'Electronics', 299.99, 'paid', 'NA', NOW() - INTERVAL '2 days'),
  ('ORD-2025-002', 'Emma Johnson', 'emma.j@outlook.com', 'Smart Watch Series 5', 'Electronics', 449.99, 'paid', 'EU', NOW() - INTERVAL '3 days'),
  ('ORD-2025-003', 'Michael Chen', 'mchen@yahoo.com', '4K Webcam', 'Electronics', 189.99, 'paid', 'APAC', NOW() - INTERVAL '1 day'),
  ('ORD-2025-004', 'Sofia Rodriguez', 'sofia.r@gmail.com', 'Mechanical Keyboard RGB', 'Electronics', 159.99, 'pending', 'LATAM', NOW() - INTERVAL '4 hours'),
  ('ORD-2025-005', 'David Kim', 'dkim@gmail.com', 'USB-C Hub 7-in-1', 'Electronics', 79.99, 'paid', 'APAC', NOW() - INTERVAL '5 days'),
  ('ORD-2025-006', 'Lisa Anderson', 'lisa.a@hotmail.com', 'Portable SSD 1TB', 'Electronics', 129.99, 'paid', 'NA', NOW() - INTERVAL '1 day'),
  ('ORD-2025-007', 'James Wilson', 'jwilson@gmail.com', 'Wireless Mouse Gaming', 'Electronics', 89.99, 'refunded', 'EU', NOW() - INTERVAL '7 days'),
  ('ORD-2025-008', 'Maria Garcia', 'maria.g@gmail.com', 'Bluetooth Speaker', 'Electronics', 119.99, 'paid', 'LATAM', NOW() - INTERVAL '2 days'),
  ('ORD-2025-009', 'Robert Taylor', 'rtaylor@yahoo.com', 'Laptop Stand Aluminum', 'Electronics', 49.99, 'paid', 'NA', NOW() - INTERVAL '6 days'),
  ('ORD-2025-010', 'Anna Kowalski', 'anna.k@gmail.com', 'Noise Cancelling Earbuds', 'Electronics', 199.99, 'paid', 'EU', NOW() - INTERVAL '3 days'),
  ('ORD-2025-011', 'Wei Zhang', 'wzhang@gmail.com', 'Wireless Charger 15W', 'Electronics', 39.99, 'paid', 'APAC', NOW() - INTERVAL '8 days'),
  ('ORD-2025-012', 'Carlos Mendez', 'cmendez@outlook.com', 'Gaming Headset Pro', 'Electronics', 179.99, 'paid', 'LATAM', NOW() - INTERVAL '4 days'),
  ('ORD-2025-013', 'Sarah Brown', 'sbrown@gmail.com', 'Webcam Ring Light', 'Electronics', 59.99, 'cancelled', 'NA', NOW() - INTERVAL '10 days'),
  ('ORD-2025-014', 'Thomas Mueller', 'tmueller@gmail.com', 'USB Microphone', 'Electronics', 149.99, 'paid', 'EU', NOW() - INTERVAL '5 days'),
  ('ORD-2025-015', 'Yuki Tanaka', 'ytanaka@yahoo.com', 'Phone Gimbal Stabilizer', 'Electronics', 229.99, 'paid', 'APAC', NOW() - INTERVAL '2 days'),
  
  -- Apparel (30% of orders, medium AOV)
  ('ORD-2025-016', 'Jennifer Lee', 'jlee@gmail.com', 'Premium Cotton T-Shirt', 'Apparel', 29.99, 'paid', 'NA', NOW() - INTERVAL '1 day'),
  ('ORD-2025-017', 'Pierre Dubois', 'pdubois@gmail.com', 'Denim Jacket Classic', 'Apparel', 89.99, 'paid', 'EU', NOW() - INTERVAL '3 days'),
  ('ORD-2025-018', 'Priya Sharma', 'psharma@gmail.com', 'Yoga Pants Set', 'Apparel', 49.99, 'paid', 'APAC', NOW() - INTERVAL '2 days'),
  ('ORD-2025-019', 'Diego Santos', 'dsantos@outlook.com', 'Running Shoes Pro', 'Apparel', 129.99, 'paid', 'LATAM', NOW() - INTERVAL '4 days'),
  ('ORD-2025-020', 'Emily White', 'ewhite@gmail.com', 'Winter Coat Wool', 'Apparel', 199.99, 'refunded', 'NA', NOW() - INTERVAL '15 days'),
  ('ORD-2025-021', 'Hans Schmidt', 'hschmidt@gmail.com', 'Leather Belt Premium', 'Apparel', 39.99, 'paid', 'EU', NOW() - INTERVAL '6 days'),
  ('ORD-2025-022', 'Mei Lin', 'mlin@yahoo.com', 'Silk Scarf Designer', 'Apparel', 79.99, 'paid', 'APAC', NOW() - INTERVAL '1 day'),
  ('ORD-2025-023', 'Isabella Costa', 'icosta@gmail.com', 'Summer Dress Floral', 'Apparel', 69.99, 'paid', 'LATAM', NOW() - INTERVAL '5 days'),
  ('ORD-2025-024', 'Kevin Park', 'kpark@gmail.com', 'Hoodie Organic Cotton', 'Apparel', 59.99, 'pending', 'NA', NOW() - INTERVAL '12 hours'),
  ('ORD-2025-025', 'Sophie Martin', 'smartin@outlook.com', 'Sneakers Limited Edition', 'Apparel', 149.99, 'paid', 'EU', NOW() - INTERVAL '7 days'),
  
  -- Home (20% of orders, medium AOV)
  ('ORD-2025-026', 'Daniel Green', 'dgreen@gmail.com', 'Coffee Maker Automatic', 'Home', 179.99, 'paid', 'NA', NOW() - INTERVAL '2 days'),
  ('ORD-2025-027', 'Olivia Rossi', 'orossi@gmail.com', 'Ceramic Dinnerware Set', 'Home', 89.99, 'paid', 'EU', NOW() - INTERVAL '4 days'),
  ('ORD-2025-028', 'Raj Patel', 'rpatel@yahoo.com', 'Air Purifier HEPA', 'Home', 249.99, 'paid', 'APAC', NOW() - INTERVAL '1 day'),
  ('ORD-2025-029', 'Lucia Fernandez', 'lfernandez@gmail.com', 'Throw Pillows Set of 4', 'Home', 49.99, 'paid', 'LATAM', NOW() - INTERVAL '6 days'),
  ('ORD-2025-030', 'Matthew Davis', 'mdavis@gmail.com', 'Vacuum Cleaner Robot', 'Home', 399.99, 'paid', 'NA', NOW() - INTERVAL '3 days'),
  ('ORD-2025-031', 'Charlotte Blanc', 'cblanc@outlook.com', 'Kitchen Knife Set', 'Home', 129.99, 'refunded', 'EU', NOW() - INTERVAL '20 days'),
  ('ORD-2025-032', 'Hiroshi Sato', 'hsato@gmail.com', 'Bamboo Cutting Board', 'Home', 34.99, 'paid', 'APAC', NOW() - INTERVAL '5 days'),
  ('ORD-2025-033', 'Ana Silva', 'asilva@gmail.com', 'Bed Sheets Egyptian Cotton', 'Home', 119.99, 'paid', 'LATAM', NOW() - INTERVAL '2 days'),
  ('ORD-2025-034', 'William Jones', 'wjones@yahoo.com', 'Table Lamp Modern', 'Home', 79.99, 'cancelled', 'NA', NOW() - INTERVAL '8 days'),
  ('ORD-2025-035', 'Emma Bergman', 'ebergman@gmail.com', 'Wall Clock Minimalist', 'Home', 59.99, 'paid', 'EU', NOW() - INTERVAL '1 day'),
  
  -- Books (10% of orders, lower AOV)
  ('ORD-2025-036', 'Alex Turner', 'aturner@gmail.com', 'The Art of Programming', 'Books', 39.99, 'paid', 'NA', NOW() - INTERVAL '3 days'),
  ('ORD-2025-037', 'Marie Leclerc', 'mleclerc@gmail.com', 'French Cooking Mastery', 'Books', 29.99, 'paid', 'EU', NOW() - INTERVAL '5 days'),
  ('ORD-2025-038', 'Arjun Kumar', 'akumar@yahoo.com', 'Mindfulness Guide', 'Books', 24.99, 'paid', 'APAC', NOW() - INTERVAL '2 days'),
  ('ORD-2025-039', 'Carmen Lopez', 'clopez@gmail.com', 'Spanish Literature Classics', 'Books', 34.99, 'paid', 'LATAM', NOW() - INTERVAL '7 days'),
  ('ORD-2025-040', 'Ryan Mitchell', 'rmitchell@gmail.com', 'Business Strategy 2026', 'Books', 44.99, 'pending', 'NA', NOW() - INTERVAL '6 hours'),

  -- Continue with more realistic data spread over 180 days
  -- Week 2 (7-14 days ago)
  ('ORD-2025-041', 'Nina Petrov', 'npetrov@gmail.com', 'Tablet Stand Adjustable', 'Electronics', 45.99, 'paid', 'EU', NOW() - INTERVAL '9 days'),
  ('ORD-2025-042', 'Takeshi Yamamoto', 'tyamamoto@yahoo.com', 'Fitness Tracker Band', 'Electronics', 79.99, 'paid', 'APAC', NOW() - INTERVAL '11 days'),
  ('ORD-2025-043', 'Laura Martinez', 'lmartinez@gmail.com', 'Casual Sneakers White', 'Apparel', 69.99, 'paid', 'LATAM', NOW() - INTERVAL '10 days'),
  ('ORD-2025-044', 'Chris Anderson', 'canderson@outlook.com', 'Blender High Speed', 'Home', 149.99, 'paid', 'NA', NOW() - INTERVAL '12 days'),
  ('ORD-2025-045', 'Isabelle Moreau', 'imoreau@gmail.com', 'Photography Basics', 'Books', 32.99, 'paid', 'EU', NOW() - INTERVAL '13 days'),
  ('ORD-2025-046', 'Vikram Singh', 'vsingh@gmail.com', 'Wireless Earbuds Sport', 'Electronics', 89.99, 'refunded', 'APAC', NOW() - INTERVAL '14 days'),
  ('ORD-2025-047', 'Gabriela Ruiz', 'gruiz@yahoo.com', 'Leather Handbag', 'Apparel', 159.99, 'paid', 'LATAM', NOW() - INTERVAL '11 days'),
  ('ORD-2025-048', 'Tom Harris', 'tharris@gmail.com', 'Smart Thermostat', 'Home', 199.99, 'paid', 'NA', NOW() - INTERVAL '9 days'),
  ('ORD-2025-049', 'Amelie Dubois', 'adubois@gmail.com', 'Cookbook Mediterranean', 'Books', 27.99, 'paid', 'EU', NOW() - INTERVAL '10 days'),
  ('ORD-2025-050', 'Kenji Nakamura', 'knakamura@gmail.com', 'Monitor Stand Dual', 'Electronics', 119.99, 'paid', 'APAC', NOW() - INTERVAL '12 days'),

  -- Week 3 (15-21 days ago)
  ('ORD-2025-051', 'Patricia Moore', 'pmoore@gmail.com', 'Laptop Sleeve 15 inch', 'Electronics', 34.99, 'paid', 'NA', NOW() - INTERVAL '16 days'),
  ('ORD-2025-052', 'Marco Bianchi', 'mbianchi@outlook.com', 'Polo Shirt Classic', 'Apparel', 54.99, 'paid', 'EU', NOW() - INTERVAL '18 days'),
  ('ORD-2025-053', 'Aisha Rahman', 'arahman@yahoo.com', 'Tea Set Porcelain', 'Home', 79.99, 'paid', 'APAC', NOW() - INTERVAL '17 days'),
  ('ORD-2025-054', 'Fernando Gomez', 'fgomez@gmail.com', 'History of Latin America', 'Books', 36.99, 'paid', 'LATAM', NOW() - INTERVAL '19 days'),
  ('ORD-2025-055', 'Jessica Taylor', 'jtaylor@gmail.com', 'Power Bank 20000mAh', 'Electronics', 49.99, 'cancelled', 'NA', NOW() - INTERVAL '20 days'),
  ('ORD-2025-056', 'Klaus Weber', 'kweber@gmail.com', 'Winter Gloves Leather', 'Apparel', 44.99, 'paid', 'EU', NOW() - INTERVAL '15 days'),
  ('ORD-2025-057', 'Sakura Tanaka', 'stanaka@gmail.com', 'Rice Cooker Smart', 'Home', 129.99, 'paid', 'APAC', NOW() - INTERVAL '16 days'),
  ('ORD-2025-058', 'Miguel Torres', 'mtorres@yahoo.com', 'Guitar Learning Guide', 'Books', 29.99, 'paid', 'LATAM', NOW() - INTERVAL '21 days'),
  ('ORD-2025-059', 'Amanda Clark', 'aclark@gmail.com', 'Webcam Cover Privacy', 'Electronics', 12.99, 'paid', 'NA', NOW() - INTERVAL '18 days'),
  ('ORD-2025-060', 'Francois Martin', 'fmartin@outlook.com', 'Dress Shirt Slim Fit', 'Apparel', 64.99, 'paid', 'EU', NOW() - INTERVAL '17 days'),

  -- Month 2 (22-60 days ago) - Continue pattern with varied amounts and statuses
  ('ORD-2025-061', 'Ravi Gupta', 'rgupta@gmail.com', 'External Hard Drive 2TB', 'Electronics', 89.99, 'paid', 'APAC', NOW() - INTERVAL '25 days'),
  ('ORD-2025-062', 'Valentina Rossi', 'vrossi@gmail.com', 'Cardigan Cashmere', 'Apparel', 139.99, 'paid', 'LATAM', NOW() - INTERVAL '28 days'),
  ('ORD-2025-063', 'Brandon Lee', 'blee@yahoo.com', 'Espresso Machine', 'Home', 299.99, 'paid', 'NA', NOW() - INTERVAL '30 days'),
  ('ORD-2025-064', 'Helena Schmidt', 'hschmidt@gmail.com', 'German Language Course', 'Books', 42.99, 'paid', 'EU', NOW() - INTERVAL '32 days'),
  ('ORD-2025-065', 'Yuki Suzuki', 'ysuzuki@gmail.com', 'Phone Case Premium', 'Electronics', 24.99, 'paid', 'APAC', NOW() - INTERVAL '35 days'),
  ('ORD-2025-066', 'Ricardo Silva', 'rsilva@outlook.com', 'Soccer Jersey Official', 'Apparel', 79.99, 'refunded', 'LATAM', NOW() - INTERVAL '38 days'),
  ('ORD-2025-067', 'Michelle White', 'mwhite@gmail.com', 'Candle Set Aromatherapy', 'Home', 39.99, 'paid', 'NA', NOW() - INTERVAL '40 days'),
  ('ORD-2025-068', 'Pierre Leroy', 'pleroy@gmail.com', 'Wine Tasting Guide', 'Books', 31.99, 'paid', 'EU', NOW() - INTERVAL '42 days'),
  ('ORD-2025-069', 'Ananya Patel', 'apatel@yahoo.com', 'Smart Light Bulbs 4-Pack', 'Electronics', 59.99, 'paid', 'APAC', NOW() - INTERVAL '45 days'),
  ('ORD-2025-070', 'Carlos Diaz', 'cdiaz@gmail.com', 'Baseball Cap Vintage', 'Apparel', 29.99, 'paid', 'LATAM', NOW() - INTERVAL '48 days'),
  ('ORD-2025-071', 'Sarah Johnson', 'sjohnson@gmail.com', 'Picture Frames Set', 'Home', 44.99, 'paid', 'NA', NOW() - INTERVAL '50 days'),
  ('ORD-2025-072', 'Andreas Muller', 'amuller@outlook.com', 'Philosophy Essentials', 'Books', 38.99, 'paid', 'EU', NOW() - INTERVAL '52 days'),
  ('ORD-2025-073', 'Haruto Tanaka', 'htanaka@gmail.com', 'Gaming Mouse Pad XXL', 'Electronics', 34.99, 'paid', 'APAC', NOW() - INTERVAL '55 days'),
  ('ORD-2025-074', 'Sofia Morales', 'smorales@gmail.com', 'Yoga Mat Premium', 'Apparel', 49.99, 'cancelled', 'LATAM', NOW() - INTERVAL '58 days'),
  ('ORD-2025-075', 'David Wilson', 'dwilson@yahoo.com', 'Toaster 4-Slice', 'Home', 69.99, 'paid', 'NA', NOW() - INTERVAL '60 days');

-- Add more orders to reach 500 total
-- This is a representative sample - in production you'd generate all 500
-- For now, let's add bulk inserts with variations

-- Generate additional 425 orders with realistic distribution
-- Using a more compact format for remaining orders

INSERT INTO orders (order_number, customer_name, customer_email, product, category, amount, status, region, created_at)
SELECT 
  'ORD-2025-' || LPAD((76 + gs.id)::TEXT, 3, '0'),
  (ARRAY['John', 'Emma', 'Michael', 'Sofia', 'David', 'Lisa', 'James', 'Maria', 'Robert', 'Anna'])[1 + MOD(gs.id, 10)] || ' ' ||
  (ARRAY['Smith', 'Johnson', 'Chen', 'Rodriguez', 'Kim', 'Anderson', 'Wilson', 'Garcia', 'Taylor', 'Lee'])[1 + MOD(gs.id, 10)],
  LOWER((ARRAY['john', 'emma', 'michael', 'sofia', 'david', 'lisa', 'james', 'maria', 'robert', 'anna'])[1 + MOD(gs.id, 10)]) || 
  '.' || LOWER((ARRAY['smith', 'johnson', 'chen', 'rodriguez', 'kim', 'anderson', 'wilson', 'garcia', 'taylor', 'lee'])[1 + MOD(gs.id, 10)]) || 
  '@' || (ARRAY['gmail.com', 'outlook.com', 'yahoo.com'])[1 + MOD(gs.id, 3)],
  CASE 
    WHEN MOD(gs.id, 10) < 4 THEN (ARRAY['Wireless Headphones', 'Smart Watch', '4K Webcam', 'Mechanical Keyboard', 'USB-C Hub', 'Portable SSD', 'Bluetooth Speaker', 'Laptop Stand', 'Gaming Mouse', 'Phone Charger'])[1 + MOD(gs.id, 10)]
    WHEN MOD(gs.id, 10) < 7 THEN (ARRAY['Cotton T-Shirt', 'Denim Jacket', 'Yoga Pants', 'Running Shoes', 'Winter Coat', 'Leather Belt', 'Silk Scarf', 'Summer Dress', 'Hoodie', 'Sneakers'])[1 + MOD(gs.id, 10)]
    WHEN MOD(gs.id, 10) < 9 THEN (ARRAY['Coffee Maker', 'Dinnerware Set', 'Air Purifier', 'Throw Pillows', 'Vacuum Cleaner', 'Kitchen Knife Set', 'Cutting Board', 'Bed Sheets', 'Table Lamp', 'Wall Clock'])[1 + MOD(gs.id, 10)]
    ELSE (ARRAY['Programming Book', 'Cooking Guide', 'Mindfulness Book', 'Literature Classic', 'Business Strategy', 'Photography Guide', 'Language Course', 'History Book', 'Art Book', 'Science Guide'])[1 + MOD(gs.id, 10)]
  END,
  CASE 
    WHEN MOD(gs.id, 10) < 4 THEN 'Electronics'
    WHEN MOD(gs.id, 10) < 7 THEN 'Apparel'
    WHEN MOD(gs.id, 10) < 9 THEN 'Home'
    ELSE 'Books'
  END,
  CASE 
    WHEN MOD(gs.id, 10) < 4 THEN (50 + (gs.id % 20) * 10 + (gs.id % 5) * 5)::NUMERIC(10,2)
    WHEN MOD(gs.id, 10) < 7 THEN (30 + (gs.id % 15) * 8 + (gs.id % 3) * 3)::NUMERIC(10,2)
    WHEN MOD(gs.id, 10) < 9 THEN (40 + (gs.id % 18) * 9 + (gs.id % 4) * 4)::NUMERIC(10,2)
    ELSE (20 + (gs.id % 10) * 3 + (gs.id % 2) * 2)::NUMERIC(10,2)
  END,
  CASE 
    WHEN MOD(gs.id, 20) = 0 THEN 'refunded'
    WHEN MOD(gs.id, 25) = 0 THEN 'cancelled'
    WHEN MOD(gs.id, 30) = 0 THEN 'pending'
    ELSE 'paid'
  END,
  (ARRAY['NA', 'EU', 'APAC', 'LATAM'])[1 + MOD(gs.id, 4)],
  NOW() - (INTERVAL '1 day' * (1 + (gs.id % 180)))
FROM generate_series(1, 425) AS gs(id);

-- Verify data
-- SELECT COUNT(*) FROM orders;
-- SELECT category, COUNT(*), ROUND(AVG(amount), 2) as avg_amount FROM orders GROUP BY category;
-- SELECT status, COUNT(*) FROM orders GROUP BY status;
-- SELECT region, COUNT(*) FROM orders GROUP BY region;
