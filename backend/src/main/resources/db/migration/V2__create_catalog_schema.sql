CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(120) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'WATCH', 'STRAP', 'ACCESSORY'
    sub_category VARCHAR(50),      -- 'FIELD', 'DIVER', 'CHRONO', 'LEATHER', 'CANVAS', 'STORAGE'
    price_cents INTEGER NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'CAD',
    badge VARCHAR(50),
    short_description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    specs JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for category filtering & price sorting
CREATE INDEX idx_products_category ON products(category, sub_category);
CREATE INDEX idx_products_price ON products(price_cents);

-- GIN index for deep querying inside JSONB specs (e.g. diameter, movement)
CREATE INDEX idx_products_specs ON products USING gin(specs);

-- Full-Text Search index across name, sub_category, and description
ALTER TABLE products ADD COLUMN search_vector tsvector
    GENERATED ALWAYS AS (
        to_tsvector('english', 
            coalesce(name, '') || ' ' || 
            coalesce(sub_category, '') || ' ' || 
            coalesce(short_description, '') || ' ' ||
            coalesce(specs::text, '')
        )
    ) STORED;

CREATE INDEX idx_products_search ON products USING gin(search_vector);

-- Initial seed data
INSERT INTO products (slug, name, category, sub_category, price_cents, badge, short_description, image_url, specs)
VALUES
(
    'khaki-expedition-field-38',
    'Khaki Expedition Field 38',
    'WATCH',
    'FIELD',
    74000,
    'In-House Regulated',
    'Bead-blasted 316L steel with a high-visibility military dial, double-domed anti-reflective sapphire, and 100m depth rating.',
    '/watch-field.jpg',
    '{"diameter": "38.0 mm", "lugToLug": "44.5 mm", "thickness": "10.5 mm", "movement": "Caliber H-10 / Powermatic (80h reserve)", "waterResistance": "100m (Screw-down crown)"}'::jsonb
),
(
    'pelagos-heritage-diver-40',
    'Pelagos Heritage Diver 40',
    'WATCH',
    'DIVER',
    89000,
    'Certified 200M',
    'Monobloc case with matte ceramic 120-click unidirectional bezel, snowflake hands, Super-LumiNova BGW9, and helium escape valve.',
    '/watch-diver.jpg',
    '{"diameter": "40.0 mm", "lugToLug": "47.0 mm", "thickness": "12.4 mm", "movement": "Sellita SW200-1 Elaboré (28,800 vph)", "waterResistance": "200m"}'::jsonb
),
(
    'intra-matic-chronograph-39',
    'Intra-Matic Chronograph 39',
    'WATCH',
    'CHRONO',
    125000,
    'Numbered Batch',
    'Reverse panda bi-compax chronograph with pump pushers, tachymeter scale, and column-wheel actuation.',
    '/watch-chrono.png',
    '{"diameter": "39.0 mm", "lugToLug": "46.2 mm", "thickness": "13.1 mm", "movement": "Valjoux 7753 Modified Column-Wheel", "waterResistance": "100m"}'::jsonb
),
(
    'mil-spec-washed-canvas-strap',
    'Mil-Spec Washed Canvas Strap',
    'STRAP',
    'CANVAS',
    5200,
    NULL,
    'Heavy-duty military duck canvas with vegetable-tanned French leather backing and quick-release spring bars.',
    '/gear-strap.jpg',
    '{"material": "18oz Cotton Canvas & Calfskin", "diameter": "20mm & 22mm with 2mm taper"}'::jsonb
),
(
    'waxed-canvas-3-slot-watch-roll',
    'Waxed Canvas 3-Slot Watch Roll',
    'ACCESSORY',
    'STORAGE',
    9800,
    NULL,
    'Weather-resistant 16oz waxed canvas lined with scratch-resistant microsuede pillows for secure transport.',
    '/gear-roll.jpg',
    '{"material": "16oz Martexin Waxed Canvas", "diameter": "Accommodates up to 46mm case sizes"}'::jsonb
);