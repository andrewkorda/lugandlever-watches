-- Add curation columns
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_best_seller BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_vault_item BOOLEAN NOT NULL DEFAULT false;

-- Create fast indexing for carousel category queries
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(is_best_seller) WHERE is_best_seller = true;
CREATE INDEX IF NOT EXISTS idx_products_vault_item ON products(is_vault_item) WHERE is_vault_item = true;

-- Update existing records with appropriate tags
UPDATE products 
SET is_featured = true, is_best_seller = true 
WHERE slug = 'khaki-expedition-field-38';

UPDATE products 
SET is_featured = true, is_vault_item = true 
WHERE slug = 'pelagos-heritage-diver-40';

UPDATE products 
SET is_best_seller = true, is_vault_item = true 
WHERE slug = 'intra-matic-chronograph-39';

-- Seed expanded collection of mechanical references
INSERT INTO products (
    slug, name, category, sub_category, price_cents, currency, badge, 
    short_description, image_url, in_stock, specs, 
    is_featured, is_best_seller, is_vault_item
)
VALUES
(
    'pilot-pioneer-mechanical-36',
    'Pilot Pioneer Mechanical 36',
    'WATCH',
    'FIELD',
    92000,
    'CAD',
    'Reissue Series',
    'Tonneau-shaped military aviator reference with textured matte dial, hand-wound 80-hour caliber, and box-domed mineral crystal.',
    '/watch-field.jpg',
    true,
    '{"diameter": "36.0 mm", "lugToLug": "42.0 mm", "thickness": "10.0 mm", "movement": "Hand-Wound Caliber H-50 (80h reserve)", "waterResistance": "100m"}'::jsonb,
    true, false, false
),
(
    'sub-sea-gmt-automatic-41',
    'Sub-Sea GMT Arctic 41',
    'WATCH',
    'DIVER',
    115000,
    'CAD',
    'True GMT',
    'Independent local jumping hour flyer GMT with bidirectional 24-click ceramic bezel and 300m pressure resistance.',
    '/watch-diver.jpg',
    true,
    '{"diameter": "41.0 mm", "lugToLug": "48.5 mm", "thickness": "13.2 mm", "movement": "Miyota 9075 High-Beat Flyer GMT", "waterResistance": "300m"}'::jsonb,
    true, true, false
),
(
    'monopoussoir-heritage-chrono-40',
    'Monopoussoir Heritage Chrono 40',
    'WATCH',
    'CHRONO',
    148000,
    'CAD',
    'Numbered Atelier Piece',
    'Single-pusher chronograph integrated into the winding crown. Lacquered dial with heat-blued steel hands.',
    '/watch-chrono.png',
    true,
    '{"diameter": "40.0 mm", "lugToLug": "47.2 mm", "thickness": "12.8 mm", "movement": "Column-Wheel Monopusher Automatic", "waterResistance": "50m"}'::jsonb,
    false, true, true
),
(
    'tactical-operator-destro-42',
    'Tactical Operator Destro 42',
    'WATCH',
    'DIVER',
    83000,
    'CAD',
    'Left-Hand Crown',
    'PVD matte graphite finish with 9 o’clock crown placement to eliminate wrist bite during heavy field maneuvers.',
    '/watch-diver.jpg',
    true,
    '{"diameter": "42.0 mm", "lugToLug": "49.0 mm", "thickness": "13.0 mm", "movement": "Seiko NH35 Regulated (±5 s/d)", "waterResistance": "200m"}'::jsonb,
    false, false, true
),
(
    'compressor-vintage-diver-39',
    'Compressor Dual-Crown Diver 39',
    'WATCH',
    'DIVER',
    98000,
    'CAD',
    'Internal Bezel',
    'Super-compressor dual-crown architecture with cross-hatched crowns and rotating internal timing ring beneath sapphire.',
    '/watch-field.jpg',
    true,
    '{"diameter": "39.0 mm", "lugToLug": "45.8 mm", "thickness": "11.6 mm", "movement": "Sellita SW200-1 Premium Grade", "waterResistance": "200m"}'::jsonb,
    false, true, true
)
ON CONFLICT (slug) DO UPDATE SET
    is_featured = EXCLUDED.is_featured,
    is_best_seller = EXCLUDED.is_best_seller,
    is_vault_item = EXCLUDED.is_vault_item;