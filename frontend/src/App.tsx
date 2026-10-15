import { useEffect, useState } from 'react';
import { Logo } from './components/Logo';
import { 
  ArrowRight, 
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

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'FIELD' | 'DIVER' | 'CHRONO'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Dynamic Catalog State
  const [watches, setWatches] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loadingWatches, setLoadingWatches] = useState(true);
  const [loadingAccessories, setLoadingAccessories] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; title: string; subtitle: string }>({
    open: false,
    title: '',
    subtitle: ''
  });

  // Cart Drawer Actions
  const { addItem, openCart, itemCount } = useCart();

  const openAuth = (title: string, subtitle: string) => {
    setAuthModal({ open: true, title, subtitle });
  };

  // 1. Dynamically fetch Watches on category change or search query
  useEffect(() => {
    setLoadingWatches(true);
    fetchCatalog('WATCH', activeCategory, searchQuery)
      .then((data) => setWatches(data))
      .catch((err) => console.error('Failed to load watches:', err))
      .finally(() => setLoadingWatches(false));
  }, [activeCategory, searchQuery]);

  // 2. Dynamically fetch Straps & Accessories once on mount
  useEffect(() => {
    setLoadingAccessories(true);
    Promise.all([
      fetchCatalog('STRAP'),
      fetchCatalog('ACCESSORY')
    ])
      .then(([straps, gear]) => setAccessories([...straps, ...gear]))
      .catch((err) => console.error('Failed to load accessories:', err))
      .finally(() => setLoadingAccessories(false));
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      
      {/* 1. Global Utility Bar */}
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

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center">
              <Logo className="h-10" />
            </a>
          </div>

          {/* Navigation Links */}
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

          {/* Action Icons */}
          <div className="flex items-center gap-5 text-zinc-800">
            {/* Interactive Search Field */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center border border-zinc-300 rounded-sm bg-white px-2 py-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search caliber, dial..."
                    autoFocus
                    className="text-xs text-zinc-900 outline-none w-36 sm:w-48"
                  />
                  <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                    <X className="w-3.5 h-3.5 text-zinc-400 hover:text-zinc-700" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:text-orange-600 transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

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

      {/* 3. Hero Banner (Cinematic Autoplay Background Video) */}
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

          {/* Dual Vignette & Text Contrast Gradient */}
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
                Discover Collection <ArrowRight className="w-4 h-4" />
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

      {/* 4. Value Proposition Strip */}
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

      {/* 5. Primary Catalog Grid (The Hamilton Product Wall) */}
      <section id="timepieces" className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 gap-6">
          <div>
            <span className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-orange-600">
              The Catalog
            </span>
            <h2 className="font-display font-black text-3xl uppercase tracking-tight text-zinc-950 mt-1">
              Timepieces
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-display font-bold uppercase tracking-wider">
            {[
              { id: 'ALL', label: 'All Watches' },
              { id: 'FIELD', label: 'Field' },
              { id: 'DIVER', label: 'Diver' },
              { id: 'CHRONO', label: 'Chronograph' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 border transition ${
                  activeCategory === tab.id 
                    ? 'bg-zinc-950 text-white border-zinc-950' 
                    : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-950 hover:text-zinc-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Product Cards Grid */}
        {loadingWatches ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse border border-zinc-200 p-6 space-y-4">
                <div className="aspect-square bg-zinc-100 rounded-sm" />
                <div className="h-4 bg-zinc-200 w-1/3" />
                <div className="h-6 bg-zinc-200 w-3/4" />
                <div className="h-4 bg-zinc-100 w-full" />
              </div>
            ))}
          </div>
        ) : watches.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 text-sm">
            No timepieces match the selected filter or search query.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {watches.map((watch) => (
              <div 
                key={watch.id}
                className="group flex flex-col bg-white border border-zinc-200 hover:border-zinc-900 transition-all duration-300"
              >
                {/* Image Frame */}
                <div className="relative aspect-square bg-[#f8f8f9] overflow-hidden p-8 flex items-center justify-center">
                  <img 
                    src={watch.imageUrl} 
                    alt={watch.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
                  />
                  {watch.badge && (
                    <span className="absolute top-4 left-4 bg-zinc-950 text-white text-[10px] font-display font-bold uppercase tracking-widest px-2.5 py-1">
                      {watch.badge}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-display font-semibold uppercase tracking-widest text-zinc-500">
                      {watch.subCategory || 'Mechanical Caliber'}
                    </div>
                    <h3 className="font-display font-bold text-lg text-zinc-950 uppercase mt-1 group-hover:text-orange-600 transition">
                      {watch.name}
                    </h3>
                    <div className="text-xs text-zinc-500 mt-2 space-y-1">
                      {watch.specs?.movement && (
                        <div><span className="font-medium text-zinc-700">Movement:</span> {String(watch.specs.movement)}</div>
                      )}
                      {(watch.specs?.diameter || watch.specs?.lugToLug) && (
                        <div>
                          <span className="font-medium text-zinc-700">Dimensions:</span> {String(watch.specs.diameter || '')} Ø {watch.specs.lugToLug ? `· ${String(watch.specs.lugToLug)} lug-to-lug` : ''}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div className="font-display font-extrabold text-lg text-zinc-950">
                      ${watch.price} <span className="text-xs font-normal text-zinc-500">{watch.currency}</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedProduct(watch)}
                        className="px-3 py-2 border border-zinc-300 text-zinc-700 hover:border-zinc-950 hover:text-zinc-950 text-xs font-display font-bold uppercase tracking-wider transition"
                      >
                        Specs
                      </button>
                      <button 
                        onClick={() => addItem(watch)}
                        className="px-4 py-2 bg-zinc-950 hover:bg-orange-600 text-white text-xs font-display font-bold uppercase tracking-wider transition flex items-center gap-1.5"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* 6. Straps & Accessories Showcase */}
      <section id="straps" className="bg-zinc-100 py-20 border-t border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <span className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-orange-600">
              Modular Versatility
            </span>
            <h2 className="font-display font-black text-3xl uppercase tracking-tight text-zinc-950 mt-1">
              Straps & Travel Gear
            </h2>
            <p className="text-xs text-zinc-600 mt-2">
              Transform the character of your watch with our precision quick-release leather, canvas, and travel rolls.
            </p>
          </div>

          {loadingAccessories ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((n) => (
                <div key={n} className="animate-pulse bg-white border border-zinc-200 h-48" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {accessories.map(item => (
                <div key={item.id} className="bg-white border border-zinc-200 flex flex-col sm:flex-row overflow-hidden group">
                  <div className="sm:w-1/2 aspect-square bg-[#f8f8f9] p-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-display font-bold uppercase tracking-widest text-zinc-400">Atelier Accessory</span>
                      <h4 className="font-display font-bold text-base uppercase text-zinc-950 mt-1">{item.name}</h4>
                      <p className="text-xs text-zinc-500 mt-2">{item.shortDescription}</p>
                    </div>
                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <span className="font-display font-bold text-base text-zinc-950">${item.price} {item.currency}</span>
                      <button 
                        onClick={() => addItem(item, item.category === 'STRAP' ? '20mm' : undefined)}
                        className="text-xs font-display font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700 flex items-center gap-1"
                      >
                        Acquire <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. Collector's Vault Velvet Rope Banner */}
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

      {/* 8. Global Brand Footer */}
      <footer className="bg-zinc-950 text-zinc-400 text-xs py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Mark Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo className="h-16" light={true} />
            <p className="text-[12px] leading-relaxed text-zinc-400 max-w-sm pt-2">
              A curated destination for mechanical watch enthusiasts. We source and deliver distinctive tool watches, premium straps, and everyday horological gear directly to your door.
            </p>
            <div className="text-[11px] text-zinc-500 font-medium">
              Ontario, Canada &nbsp;·&nbsp; Community driven passion for their timepieces
            </div>
          </div>

          {/* Column 1: Timepieces */}
          <div>
            <div className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Timepieces</div>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#timepieces" className="hover:text-white transition">Field Series 38</a></li>
              <li><a href="#timepieces" className="hover:text-white transition">Heritage Diver 40</a></li>
              <li><a href="#timepieces" className="hover:text-white transition">Monopoussoir Chrono</a></li>
              <li><a href="#straps" className="hover:text-white transition">Quick-Release Straps</a></li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div>
            <div className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Customer Care</div>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-white transition">Warranty & Regulation</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping & 30-Day Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Service & Overhauls</a></li>
              <li><a href="#" className="hover:text-white transition">Operating Manuals</a></li>
            </ul>
          </div>

          {/* Column 3: Collector's Exchange */}
          <div>
            <div className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Collector's Vault</div>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => openAuth('Virtual Box', 'Login required.')} className="hover:text-white transition">My Watch Box</button></li>
              <li><button onClick={() => openAuth('Trade Escrow', 'Login required.')} className="hover:text-white transition">Verified Escrow</button></li>
              <li><button onClick={() => openAuth('Local Meets', 'Login required.')} className="hover:text-white transition">Ontario Meetup Schedule</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-zinc-900 text-[10px] text-zinc-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Lug & Lever Horology Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Inspection</a>
            <a href="#" className="hover:text-zinc-400">Movement Testing Standards</a>
          </div>
        </div>
      </footer>

      {/* Modal: Technical Specification Dossier */}
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

      {/* Modal: Customer & Member Authentication Gate */}
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

      {/* 9. Slide-Out Acquisition Bag */}
      <CartDrawer />

    </div>
  );
}