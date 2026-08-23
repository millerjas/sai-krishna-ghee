"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] w-full bg-[#0A1045] text-white overflow-hidden rounded-3xl shadow-2xl my-3 border border-[#FFE500]/20">
      {/* Background Layer with Royal Blue Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060B28]/98 via-[#1D2B9A]/90 to-[#121B6B]/85 backdrop-blur-[1px]" />
      
      {/* Brand Ambient Glow */}
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#FFE500]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 px-6 lg:px-12 min-h-[80vh]">
        {/* Left Column: Brand Statement & Stats */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          {/* Pre-Heading Banner */}
          <div className="flex items-center gap-2 text-[#FFE500] text-xs font-semibold tracking-[0.25em] uppercase">
            <span className="w-8 h-px bg-[#FFE500]/60"></span>
            <span>PURE FARM FRESH COW MILK GHEE</span>
            <span className="w-8 h-px bg-[#FFE500]/60"></span>
          </div>

          {/* Headline (Reference Image Typography Pattern in Brand Colors) */}
          <h1 className="heading-h1 text-white leading-[1.05] tracking-tight">
            Golden Purity. <br />
            <span className="font-serif italic font-normal text-[#FFE500]">
              Rooted in Tradition.
            </span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="body-large text-blue-100/90 max-w-xl font-light leading-relaxed">
            Authentic ghee, traditionally slow-cooked from fresh cow milk. Prepared in small batches for rich golden granular texture, divine natural aroma, and exceptional purity.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <LocalizedClientLink
              href="/store"
              className="px-8 py-4 bg-[#FFE500] hover:bg-[#ebd300] text-[#1D2B9A] btn-text rounded-full shadow-lg shadow-[#FFE500]/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 font-bold"
            >
              <span>SHOP OUR GHEE →</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/store"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 btn-text rounded-full backdrop-blur-md transition-all inline-flex items-center justify-center font-medium"
            >
              OUR STORY
            </LocalizedClientLink>
          </div>

          {/* Bottom Stats Pill Card */}
          <div className="mt-4 bg-[#060B28]/80 border border-white/20 backdrop-blur-md rounded-2xl p-4 inline-flex items-center justify-between gap-8 shadow-xl">
            <div className="flex flex-col">
              <span className="text-base font-bold text-white">100%</span>
              <span className="text-[10px] text-[#FFE500] uppercase tracking-wider font-bold">PURE COW MILK</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-white">4.9★</span>
              <span className="text-[10px] text-[#FFE500] uppercase tracking-wider font-bold">RATING</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-white">10K+</span>
              <span className="text-[10px] text-[#FFE500] uppercase tracking-wider font-bold">FAMILIES</span>
            </div>
          </div>
        </div>

        {/* Right Column: Arched Window Showcase Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-t-[140px] rounded-b-3xl overflow-hidden border-2 border-[#FFE500]/40 shadow-2xl bg-[#121B6B] group">
            {/* Arch Window Ghee Photo */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B28] via-transparent to-black/30" />

            {/* Top Left Floating Pill */}
            <div className="absolute top-6 left-6 bg-[#060B28]/90 text-white border border-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
              <span className="text-[#FFE500]">🛕</span>
              <span>Traditional Bilona Churned</span>
            </div>

            {/* Bottom Right Floating Pill */}
            <div className="absolute bottom-28 right-6 bg-[#1D2B9A]/95 text-white border border-[#FFE500]/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <span className="text-emerald-400">🌿</span>
              <span>100% Pure Desi Cow Milk</span>
            </div>

            {/* Bottom Product Overlay Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#060B28]/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
              <div>
                <h4 className="font-serif font-bold text-lg text-white">Sai Krishna Cow Ghee</h4>
                <p className="text-xs text-[#FFE500] font-bold mt-0.5">
                  ₹350 / 500g • ★ 5.0 Rating
                </p>
              </div>
              <LocalizedClientLink
                href="/store"
                className="bg-[#FFE500] hover:bg-[#ebd300] text-[#1D2B9A] font-extrabold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1"
              >
                <span>ADD</span>
                <span>🛒</span>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
