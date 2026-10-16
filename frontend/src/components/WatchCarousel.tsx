import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../services/catalogService';

export type WatchFilterType = 'FEATURED' | 'BEST SELLERS' | 'COMMUNITY VAULT';

interface WatchCarouselProps {
  watches: Product[];
  activeFilter: WatchFilterType;
  onFilterChange: (filter: WatchFilterType) => void;
  onViewSpecs: (product: Product) => void;
  onAcquire: (product: Product) => void;
  loading?: boolean;
}

const FILTERS: { id: WatchFilterType; label: string }[] = [
  { id: 'FEATURED', label: 'FEATURED' },
  { id: 'BEST SELLERS', label: 'BEST SELLERS' },
  { id: 'COMMUNITY VAULT', label: 'COMMUNITY VAULT' },
];

export function WatchCarousel({
  watches,
  activeFilter,
  onFilterChange,
  onViewSpecs,
  onAcquire,
  loading = false,
}: WatchCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll indicator position & width
  const [thumbWidth, setThumbWidth] = useState(25);
  const [thumbLeft, setThumbLeft] = useState(0);

  const updateProgress = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      setThumbWidth(100);
      setThumbLeft(0);
      return;
    }

    // Indicator bar represents the visible viewport fraction
    const visibleRatio = Math.max(Math.min(clientWidth / scrollWidth, 1), 0.15);
    const calculatedWidth = visibleRatio * 100;
    const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    const calculatedLeft = progress * (100 - calculatedWidth);

    setThumbWidth(calculatedWidth);
    setThumbLeft(calculatedLeft);
  }, []);

  useEffect(() => {
    updateProgress();
    const el = scrollContainerRef.current;
    if (!el) return;

    // Reset scroll position on filter switch
    if (typeof el.scrollTo === 'function') {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollLeft = 0;
    }

    window.addEventListener('resize', updateProgress);
    return () => window.removeEventListener('resize', updateProgress);
  }, [watches, activeFilter, updateProgress]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 320;
    const el = scrollContainerRef.current;
    if (typeof el.scrollBy === 'function') {
      el.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    } else {
      el.scrollLeft += direction === 'left' ? -cardWidth : cardWidth;
    }
  };

  return (
    <section id="timepieces" className="w-full bg-white py-20 select-none">
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* 1. Header with Catalog Title & Minimalist Underline Tabs */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-4 gap-6">
          <div className="shrink-0">
            <span className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-orange-600 block">
              The Catalog
            </span>
            <h2 className="font-display font-black text-3xl uppercase tracking-tight text-zinc-950 mt-1">
              Timepieces
            </h2>
          </div>

          <div className="flex items-center gap-8 overflow-x-auto scrollbar-none">
            {FILTERS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onFilterChange(tab.id)}
                  className={`relative pb-3 text-xs font-display font-bold tracking-[0.18em] uppercase transition whitespace-nowrap ${
                    isActive ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Carousel Stage */}
        <div className="relative group/carousel mt-10">
          
          <button
            onClick={() => scroll('left')}
            aria-label="Previous slide"
            className="absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/95 border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-950 transition"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          <button
            onClick={() => scroll('right')}
            aria-label="Next slide"
            className="absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/95 border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-950 transition"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Scroll Track */}
          <div
            ref={scrollContainerRef}
            onScroll={updateProgress}
            className="w-full flex gap-6 overflow-x-auto scroll-smooth scrollbar-none py-4 px-1"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {loading ? (
              [1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-[280px] sm:w-[320px] shrink-0 animate-pulse bg-white border border-zinc-200 p-6 space-y-4"
                >
                  <div className="aspect-square bg-[#f8f8f9]" />
                  <div className="h-4 bg-zinc-200 w-1/3" />
                  <div className="h-5 bg-zinc-200 w-3/4" />
                  <div className="h-4 bg-zinc-100 w-1/2" />
                </div>
              ))
            ) : watches.length === 0 ? (
              <div className="w-full h-80 flex flex-col items-center justify-center text-center p-8 bg-[#fbfbfa] border border-dashed border-zinc-200">
                <span className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-orange-600 mb-2">
                  No Allocations Listed
                </span>
                <p className="text-zinc-500 text-xs">
                  No timepieces currently listed under {activeFilter}.
                </p>
              </div>
            ) : (
              watches.map((watch) => (
                <div
                  key={watch.id}
                  className="w-[280px] sm:w-[320px] shrink-0 flex flex-col bg-white border border-zinc-200 hover:border-zinc-900 transition-all duration-300 group"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="relative aspect-square bg-[#f8f8f9] p-8 flex items-center justify-center overflow-hidden">
                    <img
                      src={watch.imageUrl}
                      alt={watch.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {watch.badge && (
                      <span className="absolute top-3 left-3 bg-zinc-950 text-white text-[9px] font-display font-bold uppercase tracking-widest px-2 py-0.5">
                        {watch.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {watch.specs?.diameter && (
                        <span className="text-[10px] font-semibold tracking-wider text-orange-600 uppercase block">
                          Ø {String(watch.specs.diameter)}
                        </span>
                      )}
                      <h3 className="font-display font-bold text-sm text-zinc-950 uppercase mt-0.5 group-hover:text-orange-600 transition leading-snug">
                        {watch.name}
                      </h3>
                      {watch.specs?.movement && (
                        <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
                          {String(watch.specs.movement)}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <div className="font-display font-extrabold text-sm text-zinc-950">
                        ${watch.price}{' '}
                        <span className="text-[10px] font-normal text-zinc-500">
                          {watch.currency}
                        </span>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => onViewSpecs(watch)}
                          className="px-2.5 py-1.5 border border-zinc-300 text-zinc-700 hover:border-zinc-950 hover:text-zinc-950 text-[11px] font-display font-bold uppercase tracking-wider transition"
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => onAcquire(watch)}
                          className="px-3 py-1.5 bg-zinc-950 hover:bg-orange-600 text-white text-[11px] font-display font-bold uppercase tracking-wider transition"
                        >
                          Acquire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Synchronized Scroll Progress Track (Hamilton Style) */}
        {!loading && watches.length > 0 && (
          <div className="w-full mt-8 pt-2">
            <div 
              data-testid="carousel-progress-track"
              className="w-full h-[2px] bg-zinc-200 relative overflow-hidden"
            >
              <div
                data-testid="carousel-progress-thumb"
                className="h-full bg-zinc-950 absolute top-0 transition-all duration-150 ease-out"
                style={{
                  width: `${thumbWidth}%`,
                  left: `${thumbLeft}%`,
                }}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}