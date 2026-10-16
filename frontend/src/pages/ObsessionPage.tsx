import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  RotateCcw, 
  Clock, 
  Compass, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  Crosshair 
} from 'lucide-react';

export function ObsessionPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white">
      
      {/* 1. Cinematic Masthead */}
      <section className="relative bg-zinc-950 text-white min-h-[500px] flex items-center overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/catalog/watches/seiko5-watch.png"
            alt="Mechanical Watch Movement"
            className="w-full h-full object-cover object-center opacity-35 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 py-20 w-full">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex items-center gap-2 border-l-2 border-orange-500 pl-3 text-xs font-display font-bold uppercase tracking-[0.25em] text-orange-400">
              The Atelier Philosophy
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              Mechanical Integrity. <br />
              <span className="text-zinc-400">Zero Superfluous Vanity.</span>
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              Lug &amp; Lever was founded on a singular conviction: genuine mechanical watchmaking belongs on the wrist, not locked behind boutique velvet ropes, astronomical retail margins, or celebrity ambassador endorsements.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Breadcrumb Navigation */}
      <div className="border-b border-zinc-200 bg-[#fbfbfa]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-zinc-500 font-medium tracking-wider uppercase text-[11px]">
          <Link to="/" className="hover:text-zinc-950 transition">Home</Link>
          <span>/</span>
          <span className="text-zinc-950 font-bold">Our Obsession</span>
        </div>
      </div>

      {/* 3. Core Manifesto / Editorial Narrative */}
      <section className="py-24 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-orange-600 block">
                01 &mdash; The Premise
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-zinc-950">
                A Watch Is A Measure Of Finite Time.
              </h2>
              <div className="space-y-4 text-zinc-600 text-xs sm:text-sm leading-relaxed font-light">
                <p>
                  In a digital landscape defined by disposable microprocessors and planned obsolescence, a spring-driven mechanical escapement is one of the last unapologetically permanent human inventions.
                </p>
                <p>
                  We operate with an online-first model out of Ontario, Canada, eliminating expensive brick-and-mortar boutique rents to reinvest directly into technical tolerances: high-beat Swiss and Japanese calibers, double-domed anti-reflective box sapphire, 316L cold-stamped cases, and rigorous regulation testing across multiple positions.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-6 text-zinc-900 text-xs font-display font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  <span>No Luxury Markups</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  <span>Direct Inspection</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] bg-zinc-100 border border-zinc-200 overflow-hidden relative shadow-lg">
                <img
                  src="/hero-watch.png"
                  alt="Field Inspection Bench"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-zinc-950 text-white p-6 border border-zinc-800 shadow-xl max-w-xs hidden sm:block">
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-orange-500 block mb-1">
                  Tolerance Benchmark
                </span>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Every reference is calibrated across 5 positions to maintain strict ±4 seconds per day operating rate.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. The 3 Technical Pillars */}
      <section className="bg-zinc-50 py-24 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <span className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-orange-600 block">
              02 &mdash; Standards
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-zinc-950 mt-1">
              Engineering Pillars
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-light">
              We design and curate around physical resilience and horological integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white border border-zinc-200 p-8 space-y-4 flex flex-col justify-between group hover:border-zinc-950 transition duration-300">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center text-orange-600 border border-zinc-200">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg uppercase tracking-tight text-zinc-950">
                  Proven Workhorse Calibers
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  We deploy time-tested automatic movements—Sellita SW200-1, Miyota 9-Series High-Beat, and Powermatic H-Series—ensuring any qualified watchmaker can service your piece for decades to come.
                </p>
              </div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-400 group-hover:text-orange-600 transition">
                Universal Serviceability
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-zinc-200 p-8 space-y-4 flex flex-col justify-between group hover:border-zinc-950 transition duration-300">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center text-orange-600 border border-zinc-200">
                  <Crosshair className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg uppercase tracking-tight text-zinc-950">
                  Witschi Timegrapher Auditing
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  We never dropship uninspected factory batches. Every watch is unboxed, demagnetized, placed on a diagnostic acoustic microphone, and delivered with its individual timing certificate.
                </p>
              </div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-400 group-hover:text-orange-600 transition">
                Verified Amplitude &amp; Beat
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-zinc-200 p-8 space-y-4 flex flex-col justify-between group hover:border-zinc-950 transition duration-300">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center text-orange-600 border border-zinc-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg uppercase tracking-tight text-zinc-950">
                  Anti-Reflective Sapphire
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  No mineral or cheap acrylic compromises on primary tool watches. We specify 9-Mohs scratch-resistant corundum sapphire with internal multi-layer anti-reflective coatings.
                </p>
              </div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-400 group-hover:text-orange-600 transition">
                Corundum Scratch Resistance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Collectors' Vault Connection */}
      <section className="bg-zinc-950 text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block border-l-2 border-orange-500 pl-3 text-xs font-display font-bold uppercase tracking-[0.2em] text-orange-400">
              03 &mdash; Community
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight">
              A Watch Is More Than A Reference Number.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl font-light">
              Through our private Collectors&rsquo; Vault, we provide enthusiasts with a digital watch box registry to track personal amplitudes, record ownership stories, and arrange peer-to-peer trades with verified inspection escrow.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 font-display font-bold text-xs uppercase tracking-wider">
              <Link 
                to="/watches"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white transition flex items-center gap-2"
              >
                Browse Curated Timepieces <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-xs">
            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-2">
              <div className="text-orange-500 font-display font-bold text-sm">Ontario Atelier</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Direct shipping and domestic warranty handling within Canada.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-2">
              <div className="text-orange-500 font-display font-bold text-sm">30-Day Testing</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Wear it in natural light. If the proportion is not right, return it hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}