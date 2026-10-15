export interface Product {
  id: string;
  name: string;
  category: 'watch' | 'strap' | 'accessory';
  price: number;
  badge?: string;
  shortDesc: string;
  specs: {
    diameter?: string;
    lugToLug?: string;
    thickness?: string;
    movement?: string;
    waterResistance?: string;
    material?: string;
  };
  imageUrl: string;
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'll-01-field',
    name: 'Khaki Expedition Field 38',
    category: 'watch',
    price: 740,
    badge: 'In-House Regulated',
    shortDesc: 'Bead-blasted 316L steel with a high-visibility military dial, double-domed anti-reflective sapphire, and 100m depth rating.',
    specs: {
      diameter: '38.0 mm',
      lugToLug: '44.5 mm',
      thickness: '10.5 mm',
      movement: 'Caliber H-10 / Powermatic (80h reserve)',
      waterResistance: '100m (Screw-down crown)'
    },
    // Genuine mechanical field / tool watch dial
    imageUrl: '/hamilton-watch.png'
  },
  {
    id: 'll-02-diver',
    name: 'Pelagos Heritage Diver 40',
    category: 'watch',
    price: 890,
    badge: 'Certified 200M',
    shortDesc: 'Monobloc case with matte ceramic 120-click unidirectional bezel, snowflake hands, Super-LumiNova BGW9, and helium escape valve.',
    specs: {
      diameter: '40.0 mm',
      lugToLug: '47.0 mm',
      thickness: '12.4 mm',
      movement: 'Sellita SW200-1 Elaboré (28,800 vph)',
      waterResistance: '200m'
    },
    // Genuine black dial diver watch on steel oyster bracelet
    imageUrl: '/longines-watch.png'
  },
  {
    id: 'll-03-chrono',
    name: 'Intra-Matic Chronograph 39',
    category: 'watch',
    price: 1250,
    badge: 'Numbered Batch',
    shortDesc: 'Reverse panda bi-compax chronograph with pump pushers, tachymeter scale, and column-wheel actuation.',
    specs: {
      diameter: '39.0 mm',
      lugToLug: '46.2 mm',
      thickness: '13.1 mm',
      movement: 'Valjoux 7753 Modified Column-Wheel',
      waterResistance: '100m'
    },
    // Clean dress chronograph on leather strap
    imageUrl: '/grand-seiko-watch.png'
  }
];

export const ACCESSORIES: Product[] = [
  {
    id: 'strap-canvas-olive',
    name: 'Mil-Spec Washed Canvas Strap',
    category: 'strap',
    price: 52,
    shortDesc: 'Heavy-duty military duck canvas with vegetable-tanned French leather backing and quick-release spring bars.',
    specs: { 
      material: '18oz Cotton Canvas & Calfskin', 
      diameter: '20mm & 22mm with 2mm taper' 
    },
    imageUrl: '/gear-strap.jpg'
  },
  {
    id: 'roll-waxed-3',
    name: 'Waxed Canvas 3-Slot Watch Roll',
    category: 'accessory',
    price: 98,
    shortDesc: 'Weather-resistant 16oz waxed canvas lined with scratch-resistant microsuede pillows for secure transport.',
    specs: { 
      material: '16oz Martexin Waxed Canvas', 
      diameter: 'Accommodates up to 46mm case sizes' 
    },
    imageUrl: '/gear-roll.jpg'
  }
];