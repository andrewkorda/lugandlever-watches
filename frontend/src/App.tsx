import { useEffect, useState } from 'react';
import { Logo } from './components/Logo';
import { ProductCarousel, type CarouselTab } from './components/ProductCarousel';
import { 
  Lock, 
  ShieldCheck, 
  RotateCcw, 
  Clock, 
  Compass, 
  ShoppingBag, 
  Search, 
  User, 
  X, 
  Play 
} from 'lucide-react';

import { fetchCatalog, type Product } from './services/catalogService';
import { useCart } from './features/cart/CartContext';
import { CartDrawer } from './features/cart/CartDrawer';

// Tab Definitions
type WatchFilterType = 'FEATURED' | 'BEST_SELLERS' | 'COMMUNITY_VAULT';
type GearFilterType = 'FEATURED' | 'BEST_SELLERS';

const WATCH_TABS: CarouselTab<WatchFilterType>[] = [
  { id: 'FEATURED', label: 'FEATURED' },
  { id: 'BEST_SELLERS', label: 'BEST SELLERS' },
  { id: 'COMMUNITY_VAULT', label: 'COMMUNITY VAULT' },
];

const GEAR_TABS: CarouselTab<GearFilterType>[] = [
  { id: 'FEATURED', label: 'FEATURED' },
  { id: 'BEST_SELLERS', label: 'BEST SELLERS' },
];

export default function App() {
  // 1. Timepieces State
  const [watchFilter, setWatchFilter] = useState<WatchFilterType>('FEATURED');
  const [watches, setWatches] = useState<Product[]>([]);
  const [loadingWatches, setLoadingWatches] = useState(true);

  // 2. Straps & Gear State
  const [gearFilter, setGearFilter] = useState<GearFilterType>('FEATURED');
  const [gear, setGear] = useState<Product[]>([]);
  const [loadingGear, setLoadingGear] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; title: string; subtitle: string }>({
    open: false,
    title: '',
    subtitle: ''
  });

  const { addItem, openCart, itemCount } = useCart();

  const openAuth = (title: string, subtitle: string) => {
    setAuthModal({ open: true, title, subtitle });
  };

  // Fetch Watches (Filtered by collection)
  useEffect(() => {
    setLoadingWatches(true);
    fetchCatalog('WATCH', undefined, undefined, watchFilter)
      .then((data) => setWatches(data))
      .catch(console.error)
      .finally(() => setLoadingWatches(false));
  }, [watchFilter]);

  // Fetch Straps & Gear (Filtered by collection)
  useEffect(() => {
    setLoadingGear(true);
    Promise.all([
      fetchCatalog('STRAP', undefined, undefined, gearFilter),
      fetchCatalog('ACCESSORY', undefined, undefined, gearFilter)
    ])
      .then(([straps, accessories]) => setGear([...straps, ...accessories]))
      .catch(console.error)
      .finally(() => setLoadingGear(false));
  }, [gearFilter]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      {/* 1. Global Utility Bar (Unchanged) */}
      <div className="bg-zinc-950 text-zinc-400 text-[11px] font-semibold tracking-widest uppercase py-2 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-white">Canada / CAD ($)</span>
            <span className="text-zinc-600">|</span>
            <span className="text-orange-500">Official Canadian Atelier</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Complimentary Expedited Shipping & 30-Day Returns</span>
            <button 
              onClick={() => openAuth('Collector Vault', 'Sign in to access your digital watch box, trades, and private events.')}
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <User className="w-3 h-3 text-orange-500" />
              <span>Collectors' Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Navigation Header (Unchanged) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center">
              <Logo className="h-10" />
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-[12px] font-display font-bold tracking-[0.15em] uppercase text-zinc-800">
            <a href="#timepieces" className="hover:text-orange-600 transition">Watches</a>
            <a href="#straps" className="hover:text-orange-600 transition">Straps & Accessories</a>
            <a href="#heritage" className="hover:text-orange-600 transition">Our Obsession</a>
            <button 
              onClick={() => openAuth('The Enthusiast Register', 'Access verified private collector vaults and local meetup rosters.')}
              className="flex items-center gap-1 text-zinc-500 hover:text-zinc-950 transition"
            >
              <span>Collector's Vault</span>
              <Lock className="w-3 h-3 text-orange-500" />
            </button>
          </nav>

          <div className="flex items-center gap-5 text-zinc-800">
            <button 
              onClick={() => openAuth('Site Search', 'Global site discovery for articles, meetup schedules, and archive documentation is coming soon.')}
              className="hover:text-orange-600 transition"
              aria-label="Search website"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => openAuth('Customer Account', 'Sign in to review purchase history and track warranty certificates.')}
              className="hover:text-orange-600 transition flex items-center gap-1.5"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={openCart}
              className="hover:text-orange-600 transition relative"
              aria-label="View acquisition bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Banner (Unchanged) */}
      <section className="relative bg-zinc-950 text-white min-h-[560px] lg:min-h-[660px] flex items-center overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-watch.png"
            className="w-full h-full object-cover object-center opacity-70"
          >
            <source src="/hero-video-orange.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-zinc-950/20 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 py-16 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 border-l-2 border-orange-500 pl-3 text-xs font-display font-bold uppercase tracking-[0.2em] text-orange-400">
              New Release 2026
            </div>
            
            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              Engineered for the Wrist. <br />
              <span className="text-zinc-400">Built for the Elements.</span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-lg">
              Explore the Sub-Mariner Heritage Diver 40. High-beat automatic caliber, 200m depth rating, and an anti-reflective box sapphire crystal regulated in our workshop.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 font-display font-bold text-xs uppercase tracking-[0.15em]">
              <a 
                href="#timepieces" 
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white transition flex items-center gap-2"
              >
                Discover Collection
              </a>
              <button 
                onClick={() => {
                  const diver = watches.find(w => w.subCategory === 'DIVER') || watches[0];
                  if (diver) setSelectedProduct(diver);
                }}
                className="px-8 py-4 border border-zinc-500 hover:border-white text-white transition flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Watch Film & Specs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Value Proposition Strip (Unchanged) */}
      <section className="bg-zinc-100 border-b border-zinc-200 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-zinc-800">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-orange-600 shrink-0" />
            <div>
              <div className="font-display font-bold text-xs uppercase tracking-wider">3-Year Warranty</div>
              <div className="text-[11px] text-zinc-500">Regulated in-house</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-orange-600 shrink-0" />
            <div>
              <div className="font-display font-bold text-xs uppercase tracking-wider">30-Day Evaluation</div>
              <div className="text-[11px] text-zinc-500">Hassle-free return policy</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-orange-600 shrink-0" />
            <div>
              <div className="font-display font-bold text-xs uppercase tracking-wider">±4 Sec / Day Spec</div>
              <div className="text-[11px] text-zinc-500">Witschi timing card included</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-orange-600 shrink-0" />
            <div>
              <div className="font-display font-bold text-xs uppercase tracking-wider">Fast Courier Delivery</div>
              <div className="text-[11px] text-zinc-500">Direct from Ontario Atelier</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Primary Timepieces Carousel */}
      

<ProductCarousel
        id="timepieces"
        eyebrow="The Catalog"
        title="Timepieces"
        tabs={WATCH_TABS}
        activeTab={watchFilter}
        onTabChange={setWatchFilter}
        items={watches}
        loading={loadingWatches}
        onViewSpecs={setSelectedProduct}
        onAcquire={addItem}
        backgroundColor="white"
      />

      {/* 6. Modular Versatility: Straps & Travel Gear Carousel */}
      

<ProductCarousel
        id="straps"
        eyebrow="Modular Versatility"
        title="Straps & Travel Gear"
        tabs={GEAR_TABS}
        activeTab={gearFilter}
        onTabChange={setGearFilter}
        items={gear}
        loading={loadingGear}
        onAcquire={(item) => addItem(item, item.category === 'STRAP' ? '20mm' : undefined)}
        backgroundColor="zinc-100"
      />

      {/* 7. Collector's Vault Section (Unchanged) */}
      <section id="heritage" className="bg-zinc-950 text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block border-l-2 border-orange-500 pl-3 text-xs font-display font-bold uppercase tracking-[0.2em] text-orange-400">
              Members Only
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight">
              The Lug & Lever <br />
              <span className="text-zinc-400">Collectors’ Vault.</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              While our storefront remains open to all, our private enthusiast lounge offers virtual watch box registries, inspected peer-to-peer trade escrow, piece storytelling threads, and coordinates for local Guelph & regional Ontario watch meets.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 font-display font-bold text-xs uppercase tracking-wider">
              <button 
                onClick={() => openAuth('Collector\'s Membership', 'Sign up or log in to manage your collection and view trade dockets.')}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white transition flex items-center gap-2"
              >
                Access Collector Lounge <Lock className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-xs">
            <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-2">
              <div className="text-orange-500 font-display font-bold text-sm">01. Virtual Box</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Log your personal collection with caliber specs, amplitude, and service histories.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-2">
              <div className="text-orange-500 font-display font-bold text-sm">02. Safe Escrow</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Trade pieces with other collectors backed by our inspection and escrow guarantee.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-2">
              <div className="text-orange-500 font-display font-bold text-sm">03. Story Archive</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Document the personal journey and memories behind your favourite timepieces.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-2">
              <div className="text-orange-500 font-display font-bold text-sm">04. Local Salons</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                RSVP for private enthusiast meetups and handle rare references in person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Global Brand Footer (Unchanged) */}
      <footer className="bg-zinc-950 text-zinc-400 text-xs py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <Logo className="h-16" light={true} />
            <p className="text-[12px] leading-relaxed text-zinc-400 max-w-sm pt-2">
              A curated destination for mechanical watch enthusiasts. We source and deliver distinctive tool watches, premium straps, and everyday horological gear directly to your door.
            </p>
            <div className="text-[11px] text-zinc-500 font-medium">
              Ontario, Canada &nbsp;·&nbsp; Community driven passion for their timepieces
            </div>
          </div>

          <div>
            <div className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Timepieces</div>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#timepieces" className="hover:text-white transition">Field Series 38</a></li>
              <li><a href="#timepieces" className="hover:text-white transition">Heritage Diver 40</a></li>
              <li><a href="#timepieces" className="hover:text-white transition">Monopoussoir Chrono</a></li>
              <li><a href="#straps" className="hover:text-white transition">Quick-Release Straps</a></li>
            </ul>
          </div>

          <div>
            <div className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Customer Care</div>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-white transition">Warranty & Regulation</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping & 30-Day Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Service & Overhauls</a></li>
              <li><a href="#" className="hover:text-white transition">Operating Manuals</a></li>
            </ul>
          </div>

          <div>
            <div className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Collector's Vault</div>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => openAuth('Virtual Box', 'Login required.')} className="hover:text-white transition">My Watch Box</button></li>
              <li><button onClick={() => openAuth('Trade Escrow', 'Login required.')} className="hover:text-white transition">Verified Escrow</button></li>
              <li><button onClick={() => openAuth('Local Meets', 'Login required.')} className="hover:text-white transition">Ontario Meetup Schedule</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-zinc-900 text-[10px] text-zinc-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Lug & Lever Horology Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Inspection</a>
            <a href="#" className="hover:text-zinc-400">Movement Testing Standards</a>
          </div>
        </div>
      </footer>

      {/* Modals & Cart Drawer (Unchanged) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-white border border-zinc-300 max-w-lg w-full p-8 relative shadow-2xl">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-orange-600">
              Technical Dossier
            </span>
            <h3 className="font-display font-bold text-2xl text-zinc-950 uppercase mt-1">
              {selectedProduct.name}
            </h3>

            <div className="mt-4 aspect-video bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 text-xs p-4">
              <Play className="w-8 h-8 text-orange-500 mb-2 fill-current" />
              <span>[Watchmaker Review & Timegrapher Vlog Video Player]</span>
            </div>

            <div className="mt-6 border-t border-b border-zinc-200 py-4 divide-y divide-zinc-100 text-xs">
              {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([key, val]) => (
                <div key={key} className="py-2 flex justify-between">
                  <span className="text-zinc-500 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span className="font-semibold text-zinc-900">{String(val)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="font-display font-extrabold text-xl text-zinc-950">
                ${selectedProduct.price} <span className="text-xs font-normal text-zinc-500">{selectedProduct.currency}</span>
              </div>
              <button 
                onClick={() => {
                  addItem(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-display font-bold text-xs uppercase tracking-wider transition"
              >
                Acquire Piece
              </button>
            </div>
          </div>
        </div>
      )}

      {authModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-sm">
          <div className="bg-white border border-zinc-300 max-w-sm w-full p-8 relative shadow-2xl">
            <button 
              onClick={() => setAuthModal({ open: false, title: '', subtitle: '' })}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-orange-600">
              Lug & Lever Portal
            </span>
            <h3 className="font-display font-bold text-2xl text-zinc-950 uppercase mt-1">
              {authModal.title}
            </h3>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              {authModal.subtitle}
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setAuthModal({ open: false, title: '', subtitle: '' }); }} className="mt-6 space-y-4">
              <div>
                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="collector@lugandlever.com" 
                  className="w-full px-3 py-2 border border-zinc-300 text-xs text-zinc-900 focus:border-orange-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Password
                </label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••" 
                  className="w-full px-3 py-2 border border-zinc-300 text-xs text-zinc-900 focus:border-orange-600 focus:outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 py-3 bg-zinc-950 text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition"
              >
                Sign In / Join
              </button>
            </form>
          </div>
        </div>
      )}

      <CartDrawer />
    </div>
  );
}