import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X, Search } from 'lucide-react';
import { fetchCatalog, type Product } from '../services/catalogService';

interface CatalogPageProps {
  type: 'watches' | 'accessories';
  onAcquire: (product: Product) => void;
  onViewSpecs: (product: Product) => void;
}

interface ProductCardProps {
  item: Product;
  isWatches: boolean;
  onAcquire: (product: Product) => void;
  onViewSpecs: (product: Product) => void;
}

function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function ProductCard({ item, isWatches, onAcquire, onViewSpecs }: ProductCardProps) {
  return (
    <div className="group flex flex-col h-full bg-white border border-zinc-200 hover:border-zinc-900 transition-all duration-300">
      <div className="relative aspect-square bg-[#f8f8f9] p-6 flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {item.badge && (
          <span className="absolute top-3 left-3 bg-zinc-950 text-white text-[9px] font-display font-bold uppercase tracking-widest px-2 py-0.5">
            {item.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {item.specs?.diameter && (
            <span className="text-[10px] font-semibold tracking-wider text-orange-600 uppercase block">
              Ø {String(item.specs.diameter)}
            </span>
          )}
          <h3 className="font-display font-bold text-sm text-zinc-950 uppercase mt-0.5 group-hover:text-orange-600 transition leading-snug">
            {item.name}
          </h3>
          {item.shortDescription && (
            <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
              {item.shortDescription}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
          <div className="font-display font-extrabold text-sm text-zinc-950">
            ${item.price} <span className="text-[10px] font-normal text-zinc-500">{item.currency}</span>
          </div>

          <div className="flex gap-1.5">
            {isWatches && (
              <button
                onClick={() => onViewSpecs(item)}
                className="px-2.5 py-1.5 border border-zinc-300 text-zinc-700 hover:border-zinc-950 hover:text-zinc-950 text-[11px] font-display font-bold uppercase tracking-wider transition"
              >
                Specs
              </button>
            )}
            <button
              onClick={() => onAcquire(item)}
              className="px-3 py-1.5 bg-zinc-950 hover:bg-orange-600 text-white text-[11px] font-display font-bold uppercase tracking-wider transition"
            >
              Acquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CatalogPage({ type, onAcquire, onViewSpecs }: CatalogPageProps) {
  const isWatches = type === 'watches';
  const pageTitle = isWatches ? 'TIMEPIECES' : 'STRAPS & ACCESSORIES';

  const [items, setItems] = useState<Product[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 350);

  const [activeSubCategory, setActiveSubCategory] = useState<string>('ALL');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const subCategories = isWatches
    ? [
        { id: 'ALL', label: 'All Watches' },
        { id: 'FIELD', label: 'Field' },
        { id: 'DIVER', label: 'Diver' },
        { id: 'CHRONO', label: 'Chronograph' },
      ]
    : [
        { id: 'ALL', label: 'All Accessories' },
        { id: 'RUBBER', label: 'Rubber Straps' },
        { id: 'LEATHER', label: 'Leather Straps' },
        { id: 'CANVAS', label: 'Canvas / Nylon' },
        { id: 'STORAGE', label: 'Travel Rolls' },
        { id: 'TOOLS', label: 'Tools' },
      ];

  useEffect(() => {
    setIsSearching(true);
    if (isWatches) {
      fetchCatalog('WATCH', activeSubCategory === 'ALL' ? undefined : activeSubCategory, debouncedQuery)
        .then(setItems)
        .catch(console.error)
        .finally(() => {
          setInitialLoading(false);
          setIsSearching(false);
        });
    } else {
      Promise.all([
        fetchCatalog('STRAP', activeSubCategory === 'ALL' ? undefined : activeSubCategory, debouncedQuery),
        fetchCatalog('ACCESSORY', activeSubCategory === 'ALL' ? undefined : activeSubCategory, debouncedQuery),
      ])
        .then(([straps, gear]) => {
          let merged = [...straps, ...gear];
          if (activeSubCategory !== 'ALL') {
            merged = merged.filter((item) => item.subCategory === activeSubCategory);
          }
          setItems(merged);
        })
        .catch(console.error)
        .finally(() => {
          setInitialLoading(false);
          setIsSearching(false);
        });
    }
  }, [type, activeSubCategory, debouncedQuery, isWatches]);

  const sortedItems = useMemo(() => {
    const list = [...items];
    if (sortOption === 'price-asc') return list.sort((a, b) => a.price - b.price);
    if (sortOption === 'price-desc') return list.sort((a, b) => b.price - a.price);
    return list;
  }, [items, sortOption]);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Masthead Banner */}
      <div className="bg-[#fbfbfa] border-b border-zinc-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-zinc-950">
            {pageTitle}
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-light tracking-wide max-w-xl mx-auto mt-3">
            {isWatches
              ? 'Individually regulated mechanical tool watches. Every reference delivered with diagnostic timing sheets.'
              : 'Precision quick-release straps, military seatbelt weaves, and handcrafted travel rolls.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 2. Breadcrumbs & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4 text-xs">
          <div className="flex items-center gap-2 text-zinc-500 font-medium tracking-wider uppercase text-[11px]">
            <Link to="/" className="hover:text-zinc-950 transition">Home</Link>
            <span>/</span>
            <span className="text-zinc-950 font-bold">{isWatches ? 'Watches' : 'Straps & Accessories'}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-full hover:border-zinc-950 font-display font-bold text-[11px] uppercase tracking-wider text-zinc-800 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showFilterDrawer ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <div className="relative inline-flex items-center gap-1.5 text-zinc-700 font-display font-bold text-[11px] uppercase tracking-wider">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent border-none text-zinc-900 font-bold outline-none cursor-pointer pr-4"
              >
                <option value="featured">Position</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Filter Drawer */}
        {showFilterDrawer && (
          <div className="bg-[#f8f8f9] border border-zinc-200 p-6 my-6 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-zinc-500 block mb-2">
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {subCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveSubCategory(cat.id)}
                      className={`px-3.5 py-1.5 text-xs font-display font-bold uppercase tracking-wider border transition ${
                        activeSubCategory === cat.id
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-950'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-72">
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-zinc-500 block mb-2">
                  Ref / Keyword Search
                </span>
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search caliber, material..."
                    className="w-full pl-9 pr-8 py-1.5 border border-zinc-300 bg-white text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2.5 text-zinc-400 hover:text-zinc-900">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Product Wall with Non-Destructive Search Loading */}
        <div className="min-h-[600px] pt-6">
          {initialLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="animate-pulse bg-white border border-zinc-200 p-6 space-y-4">
                  <div className="aspect-square bg-[#f8f8f9]" />
                  <div className="h-4 bg-zinc-200 w-1/3" />
                  <div className="h-5 bg-zinc-200 w-3/4" />
                  <div className="h-4 bg-zinc-100 w-1/2" />
                </div>
              ))}
            </div>
          ) : sortedItems.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-[#fbfbfa] border border-dashed border-zinc-200">
              <span className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-orange-600 mb-2">
                No Allocations Found
              </span>
              <p className="text-zinc-500 text-xs max-w-sm mb-4">
                No products match your active filters or search parameters.
              </p>
              <button
                onClick={() => { setActiveSubCategory('ALL'); setSearchQuery(''); }}
                className="px-4 py-2 border border-zinc-300 text-xs font-display font-bold uppercase tracking-wider text-zinc-800 hover:border-zinc-950 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-opacity duration-200 ${isSearching ? 'opacity-60' : 'opacity-100'}`}>
              
              {/* Columns 1, 2, 3 */}
              {sortedItems.slice(0, 3).map((item) => (
                <ProductCard 
                  key={item.id} 
                  item={item} 
                  isWatches={isWatches} 
                  onAcquire={onAcquire} 
                  onViewSpecs={onViewSpecs} 
                />
              ))}

              {/* Column 4, Row 1: Fixed Editorial Campaign Tile */}
              <div className="group flex flex-col h-full bg-zinc-950 border border-zinc-900 overflow-hidden relative shadow-sm">
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 shrink-0">
                  <img
                    src="/catalog/watches/hamilton-watch.png"
                    alt="Atelier Field Campaign"
                    className="w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-[9px] font-display font-bold uppercase tracking-widest px-2 py-0.5">
                    Field Campaign
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between text-white space-y-3 bg-zinc-950">
                  <div>
                    <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-orange-400 block">
                      Atelier Standards
                    </span>
                    <h3 className="font-display font-black text-base uppercase tracking-tight text-white mt-1 leading-snug">
                      Tested to 5 Positions
                    </h3>
                    <p className="text-zinc-400 text-[11px] leading-relaxed mt-1">
                      Every mechanical movement is regulated on Witschi acoustic timing equipment before registry delivery.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                      Grade Elaboré
                    </span>
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1">
                      Certified ±4 s/d
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2+: Items 4 and beyond */}
              {sortedItems.slice(3).map((item) => (
                <ProductCard 
                  key={item.id} 
                  item={item} 
                  isWatches={isWatches} 
                  onAcquire={onAcquire} 
                  onViewSpecs={onViewSpecs} 
                />
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}