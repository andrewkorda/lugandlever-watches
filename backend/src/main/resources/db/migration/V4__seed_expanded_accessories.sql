-- Seed expanded collection of straps and horological gear
INSERT INTO products (
    slug, name, category, sub_category, price_cents, currency, badge, 
    short_description, image_url, in_stock, specs, 
    is_featured, is_best_seller, is_vault_item
)
VALUES
-- 1. Straps (Featured & Best Sellers)
(
    'tropic-fkm-rubber-strap-black',
    'Tropic FKM Rubber Dive Strap 20mm',
    'STRAP',
    'RUBBER',
    6800,
    'CAD',
    'FKM Fluorocarbon',
    '1960s perforated skin-diver pattern molded from lint-resistant vulcanized FKM rubber with solid machined 316L buckle.',
    '/gear-strap.jpg',
    true,
    '{"material": "FKM Vulcanized Fluorocarbon Rubber", "diameter": "20mm with 16mm taper", "hardware": "Brushed 316L Stainless Steel"}'::jsonb,
    true, true, false
),
(
    'horween-chromexcel-leather-strap',
    'Horween Chromexcel Minimalist Strap',
    'STRAP',
    'LEATHER',
    8500,
    'CAD',
    'Handcrafted',
    'Pull-up aniline-treated Horween leather from Chicago with raw edges, minimal contrast box stitching, and quick-release bars.',
    '/gear-strap.jpg',
    true,
    '{"material": "Horween Chromexcel Cowhide", "diameter": "20mm & 22mm with 2mm taper", "hardware": "Bead-Blasted Steel Buckle"}'::jsonb,
    true, false, false
),
(
    'seatbelt-single-pass-nato-khaki',
    'Tactical Seatbelt Nylon Strap 20mm',
    'STRAP',
    'CANVAS',
    4200,
    'CAD',
    'Military Spec',
    'High-density 1.4mm seatbelt weave with ultrasonically welded holes and floating keeper rings for field endurance.',
    '/gear-strap.jpg',
    true,
    '{"material": "High-Density Nylon Weave", "diameter": "20mm / 290mm length", "hardware": "Matte PVD Black Hardware"}'::jsonb,
    false, true, false
),
(
    'french-safiano-leather-strap-cognac',
    'Saffiano Calfskin Dress Strap 19mm',
    'STRAP',
    'LEATHER',
    9400,
    'CAD',
    'Scratch Resistant',
    'Cross-hatch textured French calfskin lined with sweat-resistant Zermatt leather for summer dress rotation.',
    '/gear-strap.jpg',
    true,
    '{"material": "French Saffiano Calfskin & Zermatt Lining", "diameter": "19mm with 16mm taper", "hardware": "Polished Mirror Buckle"}'::jsonb,
    false, true, false
),

-- 2. Travel Gear & Storage
(
    'leather-watch-folio-single',
    'Horological Travel Folio (Single Slot)',
    'ACCESSORY',
    'STORAGE',
    7500,
    'CAD',
    'Impact Guard',
    'Rigid semi-crushproof full-grain cowhide case with recessed recessed center well to prevent crown scuffing.',
    '/gear-roll.jpg',
    true,
    '{"material": "Vegetable Tanned Cowhide", "diameter": "Fits up to 47mm case diameters with bracelet"}'::jsonb,
    true, true, false
),
(
    'waxed-canvas-tool-pouch',
    'Watchmaker Spring Bar & Tool Pouch',
    'ACCESSORY',
    'STORAGE',
    4800,
    'CAD',
    'Field Kit',
    'Triple-fold Martexin waxed canvas roll designed to hold extra spring bars, sizing screwdrivers, and two spare straps.',
    '/gear-roll.jpg',
    true,
    '{"material": "16oz Martexin Canvas", "diameter": "Unfolded: 24cm x 18cm"}'::jsonb,
    false, true, false
),
(
    'bergeon-6767-f-springbar-tool',
    'Atelier Precision Spring Bar Tool',
    'ACCESSORY',
    'TOOLS',
    3400,
    'CAD',
    'Swiss Tooling',
    'Stainless steel knurled body with reversible 0.8mm fine pin and 1.2mm forked fork for scratch-free strap swaps.',
    '/gear-strap.jpg',
    true,
    '{"material": "Hardened Stainless Steel", "diameter": "145mm length"}'::jsonb,
    true, false, false
)
ON CONFLICT (slug) DO UPDATE SET
    is_featured = EXCLUDED.is_featured,
    is_best_seller = EXCLUDED.is_best_seller,
    short_description = EXCLUDED.short_description,
    specs = EXCLUDED.specs;