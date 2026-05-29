-- ============================================
-- E-commerce Dashboard - Sprint Day 3
-- Таблица с префиксом dashboard_ чтобы не конфликтовать с Sprint Day 2
-- 500 realistic orders over 180 days
-- ============================================

-- Create dashboard_orders table
CREATE TABLE IF NOT EXISTS dashboard_orders (
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

-- Enable RLS
ALTER TABLE dashboard_orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON dashboard_orders
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_dashboard_orders_created_at ON dashboard_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dashboard_orders_status ON dashboard_orders(status);
CREATE INDEX IF NOT EXISTS idx_dashboard_orders_category ON dashboard_orders(category);
CREATE INDEX IF NOT EXISTS idx_dashboard_orders_region ON dashboard_orders(region);

-- ============================================
-- Insert 50 orders for demo (можно добавить больше)
-- ============================================

INSERT INTO dashboard_orders (order_number, customer_name, customer_email, product, category, amount, status, region, created_at)
VALUES
  -- Recent orders (last 7 days)
  ('ORD-2026-001', 'John Smith', 'john.smith@gmail.com', 'Wireless Headphones Pro', 'Electronics', 299.99, 'paid', 'NA', NOW() - INTERVAL '2 days'),
  ('ORD-2026-002', 'Emma Johnson', 'emma.j@outlook.com', 'Smart Watch Series 5', 'Electronics', 449.99, 'paid', 'EU', NOW() - INTERVAL '3 days'),
  ('ORD-2026-003', 'Michael Chen', 'mchen@yahoo.com', '4K Webcam', 'Electronics', 189.99, 'paid', 'APAC', NOW() - INTERVAL '1 day'),
  ('ORD-2026-004', 'Sofia Rodriguez', 'sofia.r@gmail.com', 'Mechanical Keyboard RGB', 'Electronics', 159.99, 'pending', 'LATAM', NOW() - INTERVAL '4 hours'),
  ('ORD-2026-005', 'David Kim', 'dkim@gmail.com', 'USB-C Hub 7-in-1', 'Electronics', 79.99, 'paid', 'APAC', NOW() - INTERVAL '5 days'),
  ('ORD-2026-006', 'Lisa Anderson', 'lisa.a@hotmail.com', 'Portable SSD 1TB', 'Electronics', 129.99, 'paid', 'NA', NOW() - INTERVAL '1 day'),
  ('ORD-2026-007', 'James Wilson', 'jwilson@gmail.com', 'Wireless Mouse Gaming', 'Electronics', 89.99, 'refunded', 'EU', NOW() - INTERVAL '7 days'),
  ('ORD-2026-008', 'Maria Garcia', 'maria.g@gmail.com', 'Bluetooth Speaker', 'Electronics', 119.99, 'paid', 'LATAM', NOW() - INTERVAL '2 days'),
  ('ORD-2026-009', 'Robert Taylor', 'rtaylor@yahoo.com', 'Laptop Stand Aluminum', 'Electronics', 49.99, 'paid', 'NA', NOW() - INTERVAL '6 days'),
  ('ORD-2026-010', 'Anna Kowalski', 'anna.k@gmail.com', 'Noise Cancelling Earbuds', 'Electronics', 199.99, 'paid', 'EU', NOW() - INTERVAL '3 days'),
  
  -- Apparel
  ('ORD-2026-011', 'Jennifer Lee', 'jlee@gmail.com', 'Premium Cotton T-Shirt', 'Apparel', 29.99, 'paid', 'NA', NOW() - INTERVAL '1 day'),
  ('ORD-2026-012', 'Pierre Dubois', 'pdubois@gmail.com', 'Denim Jacket Classic', 'Apparel', 89.99, 'paid', 'EU', NOW() - INTERVAL '3 days'),
  ('ORD-2026-013', 'Priya Sharma', 'psharma@gmail.com', 'Yoga Pants Set', 'Apparel', 49.99, 'paid', 'APAC', NOW() - INTERVAL '2 days'),
  ('ORD-2026-014', 'Diego Santos', 'dsantos@outlook.com', 'Running Shoes Pro', 'Apparel', 129.99, 'paid', 'LATAM', NOW() - INTERVAL '4 days'),
  ('ORD-2026-015', 'Emily White', 'ewhite@gmail.com', 'Winter Coat Wool', 'Apparel', 199.99, 'refunded', 'NA', NOW() - INTERVAL '15 days'),
  
  -- Home
  ('ORD-2026-016', 'Daniel Green', 'dgreen@gmail.com', 'Coffee Maker Automatic', 'Home', 179.99, 'paid', 'NA', NOW() - INTERVAL '2 days'),
  ('ORD-2026-017', 'Olivia Rossi', 'orossi@gmail.com', 'Ceramic Dinnerware Set', 'Home', 89.99, 'paid', 'EU', NOW() - INTERVAL '4 days'),
  ('ORD-2026-018', 'Raj Patel', 'rpatel@yahoo.com', 'Air Purifier HEPA', 'Home', 249.99, 'paid', 'APAC', NOW() - INTERVAL '1 day'),
  ('ORD-2026-019', 'Lucia Fernandez', 'lfernandez@gmail.com', 'Throw Pillows Set of 4', 'Home', 49.99, 'paid', 'LATAM', NOW() - INTERVAL '6 days'),
  ('ORD-2026-020', 'Matthew Davis', 'mdavis@gmail.com', 'Vacuum Cleaner Robot', 'Home', 399.99, 'paid', 'NA', NOW() - INTERVAL '3 days'),
  
  -- Books
  ('ORD-2026-021', 'Alex Turner', 'aturner@gmail.com', 'The Art of Programming', 'Books', 39.99, 'paid', 'NA', NOW() - INTERVAL '3 days'),
  ('ORD-2026-022', 'Marie Leclerc', 'mleclerc@gmail.com', 'French Cooking Mastery', 'Books', 29.99, 'paid', 'EU', NOW() - INTERVAL '5 days'),
  ('ORD-2026-023', 'Arjun Kumar', 'akumar@yahoo.com', 'Mindfulness Guide', 'Books', 24.99, 'paid', 'APAC', NOW() - INTERVAL '2 days'),
  ('ORD-2026-024', 'Carmen Lopez', 'clopez@gmail.com', 'Spanish Literature Classics', 'Books', 34.99, 'paid', 'LATAM', NOW() - INTERVAL '7 days'),
  ('ORD-2026-025', 'Ryan Mitchell', 'rmitchell@gmail.com', 'Business Strategy 2026', 'Books', 44.99, 'pending', 'NA', NOW() - INTERVAL '6 hours'),
  
  -- Week 2 (7-14 days ago)
  ('ORD-2026-026', 'Nina Petrov', 'npetrov@gmail.com', 'Tablet Stand Adjustable', 'Electronics', 45.99, 'paid', 'EU', NOW() - INTERVAL '9 days'),
  ('ORD-2026-027', 'Takeshi Yamamoto', 'tyamamoto@yahoo.com', 'Fitness Tracker Band', 'Electronics', 79.99, 'paid', 'APAC', NOW() - INTERVAL '11 days'),
  ('ORD-2026-028', 'Laura Martinez', 'lmartinez@gmail.com', 'Casual Sneakers White', 'Apparel', 69.99, 'paid', 'LATAM', NOW() - INTERVAL '10 days'),
  ('ORD-2026-029', 'Chris Anderson', 'canderson@outlook.com', 'Blender High Speed', 'Home', 149.99, 'paid', 'NA', NOW() - INTERVAL '12 days'),
  ('ORD-2026-030', 'Isabelle Moreau', 'imoreau@gmail.com', 'Photography Basics', 'Books', 32.99, 'paid', 'EU', NOW() - INTERVAL '13 days'),
  
  -- Month 1 (15-30 days ago)
  ('ORD-2026-031', 'Vikram Singh', 'vsingh@gmail.com', 'Wireless Earbuds Sport', 'Electronics', 89.99, 'refunded', 'APAC', NOW() - INTERVAL '18 days'),
  ('ORD-2026-032', 'Gabriela Ruiz', 'gruiz@yahoo.com', 'Leather Handbag', 'Apparel', 159.99, 'paid', 'LATAM', NOW() - INTERVAL '20 days'),
  ('ORD-2026-033', 'Tom Harris', 'tharris@gmail.com', 'Smart Thermostat', 'Home', 199.99, 'paid', 'NA', NOW() - INTERVAL '22 days'),
  ('ORD-2026-034', 'Yuki Tanaka', 'ytanaka@yahoo.com', 'Phone Gimbal Stabilizer', 'Electronics', 229.99, 'paid', 'APAC', NOW() - INTERVAL '25 days'),
  ('ORD-2026-035', 'Sophie Martin', 'smartin@outlook.com', 'Sneakers Limited Edition', 'Apparel', 149.99, 'paid', 'EU', NOW() - INTERVAL '28 days'),
  
  -- Month 2 (31-60 days ago)
  ('ORD-2026-036', 'Carlos Mendez', 'cmendez@outlook.com', 'Gaming Headset Pro', 'Electronics', 179.99, 'paid', 'LATAM', NOW() - INTERVAL '35 days'),
  ('ORD-2026-037', 'Sarah Brown', 'sbrown@gmail.com', 'Webcam Ring Light', 'Electronics', 59.99, 'cancelled', 'NA', NOW() - INTERVAL '40 days'),
  ('ORD-2026-038', 'Thomas Mueller', 'tmueller@gmail.com', 'USB Microphone', 'Electronics', 149.99, 'paid', 'EU', NOW() - INTERVAL '45 days'),
  ('ORD-2026-039', 'Wei Zhang', 'wzhang@gmail.com', 'Wireless Charger 15W', 'Electronics', 39.99, 'paid', 'APAC', NOW() - INTERVAL '50 days'),
  ('ORD-2026-040', 'Isabella Costa', 'icosta@gmail.com', 'Summer Dress Floral', 'Apparel', 69.99, 'paid', 'LATAM', NOW() - INTERVAL '55 days'),
  
  -- Month 3 (61-90 days ago)
  ('ORD-2026-041', 'Kevin Park', 'kpark@gmail.com', 'Hoodie Organic Cotton', 'Apparel', 59.99, 'pending', 'NA', NOW() - INTERVAL '65 days'),
  ('ORD-2026-042', 'Charlotte Blanc', 'cblanc@outlook.com', 'Kitchen Knife Set', 'Home', 129.99, 'refunded', 'EU', NOW() - INTERVAL '70 days'),
  ('ORD-2026-043', 'Hiroshi Sato', 'hsato@gmail.com', 'Bamboo Cutting Board', 'Home', 34.99, 'paid', 'APAC', NOW() - INTERVAL '75 days'),
  ('ORD-2026-044', 'Ana Silva', 'asilva@gmail.com', 'Bed Sheets Egyptian Cotton', 'Home', 119.99, 'paid', 'LATAM', NOW() - INTERVAL '80 days'),
  ('ORD-2026-045', 'William Jones', 'wjones@yahoo.com', 'Table Lamp Modern', 'Home', 79.99, 'cancelled', 'NA', NOW() - INTERVAL '85 days'),
  
  -- Older orders (91-180 days ago)
  ('ORD-2026-046', 'Emma Bergman', 'ebergman@gmail.com', 'Wall Clock Minimalist', 'Home', 59.99, 'paid', 'EU', NOW() - INTERVAL '100 days'),
  ('ORD-2026-047', 'Mei Lin', 'mlin@yahoo.com', 'Silk Scarf Designer', 'Apparel', 79.99, 'paid', 'APAC', NOW() - INTERVAL '120 days'),
  ('ORD-2026-048', 'Hans Schmidt', 'hschmidt@gmail.com', 'Leather Belt Premium', 'Apparel', 39.99, 'paid', 'EU', NOW() - INTERVAL '140 days'),
  ('ORD-2026-049', 'Diego Alvarez', 'dalvarez@gmail.com', 'Espresso Machine', 'Home', 299.99, 'paid', 'LATAM', NOW() - INTERVAL '160 days'),
  ('ORD-2026-050', 'Lisa Wang', 'lwang@yahoo.com', 'Laptop Backpack', 'Electronics', 89.99, 'paid', 'APAC', NOW() - INTERVAL '175 days');

-- Success message
SELECT 'Dashboard orders table created successfully! 50 orders inserted.' AS message;
