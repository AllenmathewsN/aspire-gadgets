-- Run this file once to set up the database
-- psql -U postgres -d techmart -f seed.sql

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  icon TEXT,
  label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  img TEXT,
  is_range BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  fname TEXT,
  lname TEXT,
  phone TEXT,
  location TEXT,
  payment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_name TEXT,
  product_price TEXT,
  product_img TEXT
);

-- Seed categories
INSERT INTO categories (icon, label) VALUES
  ('🔥', 'Hot Phones'),
  ('📱', 'Smartphones'),
  ('🎧', 'Accessories'),
  ('📺', 'TVs'),
  ('🔊', 'Audio')
ON CONFLICT DO NOTHING;

-- Hot Phones
INSERT INTO products (category_id, name, price, description, img) VALUES
  (1,'Oneplus Smartphones','From Ksh 35,000','Known for fast charging and clean Android. Great performance for the price.','https://images.unsplash.com/photo-1604689598793-b8bf1dc445a1?w=400&q=70'),
  (1,'Xiaomi Smartphones','From Ksh 12,000','Feature-packed phones at every price point. Popular in Kenya for incredible value.','https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=70'),
  (1,'Samsung Smartphones','From Ksh 15,000','Trusted brand with wide service coverage across Kenya and reliable long-term updates.','https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=70'),
  (1,'Tecno Smartphones','From Ksh 8,000','Built for African markets. Good cameras, long battery life and great local support.','https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=70'),
  (1,'Infinix Smartphones','From Ksh 7,500','Slim designs with large screens. Popular among students and young professionals.','https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=70'),
  (1,'Nokia Smartphones','From Ksh 9,000','Durable build quality with stock Android experience and long software support.','https://images.unsplash.com/photo-1533228100845-08145b01de14?w=400&q=70'),
  (1,'RealMe Smartphones','From Ksh 14,000','Trendy designs with gaming-focused performance at competitive mid-range prices.','https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=70'),
  (1,'Oppo Smartphones','From Ksh 18,000','Excellent cameras and ultra-fast charging. Strong in portrait photography.','https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400&q=70'),
  (1,'Pixel Smartphones','From Ksh 55,000','Google''s own phones. Best Android camera system and guaranteed software updates.','https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=70');

-- Smartphones (price ranges)
INSERT INTO products (category_id, name, price, description, is_range) VALUES
  (2,'Under Ksh 2,000','Budget','Basic smartphones for calls, WhatsApp and light browsing.',TRUE),
  (2,'Ksh 2,000–5,000','Entry level','Feature phones and basic Android devices for everyday use.',TRUE),
  (2,'Ksh 5,000–10,000','Low mid-range','Reliable everyday smartphones with decent cameras and good battery.',TRUE),
  (2,'Ksh 10,000–20,000','Mid-range','Good performance, solid cameras, all-day battery life.',TRUE),
  (2,'Ksh 20,000–30,000','Upper mid','Near-flagship features at a very reasonable price point.',TRUE),
  (2,'Ksh 30,000–40,000','High-end','Flagship-grade performance and camera systems.',TRUE),
  (2,'Ksh 40,000–70,000','Premium','Top-tier devices from Samsung, Apple, and more.',TRUE),
  (2,'Ksh 70,000–100,000','Ultra premium','Best of the best — leading specs in every category.',TRUE),
  (2,'Ksh 100,000–200,000','Flagship','Latest flagship models including iPhone Pro and Galaxy Ultra.',TRUE);

-- Accessories
INSERT INTO products (category_id, name, price, description, img) VALUES
  (3,'Earphones','From Ksh 500','Wired and wireless options from JBL, Samsung, and trusted local brands.','https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=70'),
  (3,'Headphones','From Ksh 1,500','Over-ear and on-ear headphones for music lovers and remote workers.','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=70'),
  (3,'Smartwatches','From Ksh 3,000','Fitness trackers and smartwatches compatible with Android and iOS.','https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=70'),
  (3,'Memory Cards','From Ksh 800','MicroSD cards from SanDisk and Samsung in various sizes.','https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=70'),
  (3,'Back Covers','From Ksh 300','Protective cases and stylish covers for all popular phone models.','https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=70'),
  (3,'Flip Covers','From Ksh 500','Flip and book-style covers with full screen protection.','https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&q=70'),
  (3,'Glass Protectors','From Ksh 200','Tempered glass screen protectors fitting most popular models.','https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=400&q=70'),
  (3,'Chargers & Cables','From Ksh 400','Fast chargers, USB-C, Lightning, and micro-USB cables.','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70'),
  (3,'Phone Batteries','From Ksh 1,200','Replacement batteries for Tecno, Infinix, Samsung, and more.','https://images.unsplash.com/photo-1609770231080-e321deccc34c?w=400&q=70');

-- TVs
INSERT INTO products (category_id, name, price, description, is_range) VALUES
  (4,'Ksh 5,000–10,000','Budget TV','Small screen, basic Smart TV functions. Great for bedroom use.',TRUE),
  (4,'Ksh 10,000–20,000','Entry Smart TV','32-inch Android Smart TVs with YouTube and Netflix support.',TRUE),
  (4,'Ksh 20,000–30,000','Mid-range TV','Full HD Smart TVs with wide viewing angles and great sound.',TRUE),
  (4,'Ksh 30,000–40,000','Large screen','43-inch and above Full HD with built-in decoders.',TRUE),
  (4,'Ksh 40,000–100,000','4K TV','4K UHD Smart TVs with Dolby Vision and HDR10 support.',TRUE),
  (4,'Above Ksh 100,000','Premium TV','QLED, OLED, and 8K TVs from Samsung, LG, and Sony.',TRUE);

INSERT INTO products (category_id, name, price, description, img) VALUES
  (4,'32"–43" Inches','Compact','Perfect for bedrooms, small offices, and student spaces.','https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=70'),
  (4,'44"–50" Inches','Standard','The most popular living room size in Kenya.','https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=70'),
  (4,'51"–60" Inches','Large screen','Cinema-like experience for spacious rooms and home theatres.','https://images.unsplash.com/photo-1571415060716-baff5f717b37?w=400&q=70');

-- Audio
INSERT INTO products (category_id, name, price, description, is_range) VALUES
  (5,'Ksh 2,000–5,000','Budget audio','Portable Bluetooth speakers and basic home audio systems.',TRUE),
  (5,'Ksh 5,000–10,000','Mid audio','Quality Bluetooth speakers and soundbars for everyday use.',TRUE),
  (5,'Ksh 10,000–20,000','Home audio','Powerful soundbars and bookshelf speakers for home setups.',TRUE),
  (5,'Ksh 20,000–30,000','Premium audio','Hi-fi speakers and wireless home theatre systems.',TRUE),
  (5,'Ksh 30,000–100,000','High-end','Professional-grade sound systems and audiophile equipment.',TRUE),
  (5,'Above Ksh 100,000','Ultra premium','Top-tier home cinema and audiophile setups.',TRUE);

INSERT INTO products (category_id, name, price, description, img) VALUES
  (5,'Anker','Brand','Popular for portable speakers, soundbars, and audio accessories.','https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=70'),
  (5,'Sony','Brand','World-class audio — headphones, speakers, and home theatre.','https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=70'),
  (5,'JBL','Brand','Iconic sound. Known for the Flip, Charge, and Xtreme speaker series.','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70');
