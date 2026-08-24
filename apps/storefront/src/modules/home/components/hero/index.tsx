"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] w-full bg-[#173B2F] text-[#FAF7F0] overflow-hidden rounded-3xl shadow-2xl my-4 border border-[#D69A24]/30">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E2920]/95 via-[#173B2F]/90 to-[#173B2F]/80 backdrop-blur-[1px]" />
      
      {/* Ambient Gold Glow */}
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#D69A24]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="content-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 px-6 lg:px-12 min-h-[85vh]">
        {/* Left Column: Headline & Statement */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-[#D69A24] text-xs font-semibold tracking-[0.25em] uppercase">
            <span className="w-8 h-px bg-[#D69A24]/60"></span>
            <span>PURE FARM FRESH A2 DAIRY</span>
            <span className="w-8 h-px bg-[#D69A24]/60"></span>
          </div>

          {/* Editorial Headline */}
          <h1 className="heading-h1 text-[#FAF7F0] leading-[1.05] tracking-tight">
            Golden Purity. <br />
            <span className="font-serif italic font-normal text-[#D69A24]">
              Rooted in Tradition.
            </span>
          </h1>

          {/* Description */}
          <p className="body-large text-[#FAF7F0]/80 max-w-xl font-light leading-relaxed">
            Authentic ghee, traditionally hand-churned using the ancient Bilona method from grass-fed farm milk. Prepared in small batches for exceptional aroma and purity.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <LocalizedClientLink
              href="/store"
              className="px-8 py-4 bg-[#D69A24] hover:bg-[#B87B10] text-[#173B2F] font-sans font-bold text-sm rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
            >
              <span>SHOP OUR GHEE →</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/#story"
              className="px-8 py-4 bg-[#FAF7F0]/10 hover:bg-[#D69A24]/20 text-[#FAF7F0] border border-[#FAF7F0]/30 hover:border-[#D69A24] font-sans font-medium text-sm rounded-full backdrop-blur-md transition-all inline-flex items-center justify-center"
            >
              OUR STORY
            </LocalizedClientLink>
          </div>

          {/* Stats Bar */}
          <div className="mt-4 bg-[#0E2920]/80 border border-[#D69A24]/30 backdrop-blur-md rounded-2xl p-4 inline-flex items-center justify-between gap-8 shadow-xl">
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#FAF7F0]">100%</span>
              <span className="text-[10px] text-[#D69A24] uppercase tracking-wider font-bold">PURE A2 DAIRY</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#FAF7F0]">4.9★</span>
              <span className="text-[10px] text-[#D69A24] uppercase tracking-wider font-bold">RATING</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#FAF7F0]">10K+</span>
              <span className="text-[10px] text-[#D69A24] uppercase tracking-wider font-bold">FAMILIES</span>
            </div>
          </div>
        </div>

        {/* Right Column: Arched Visual Window */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-t-[140px] rounded-b-3xl overflow-hidden border-2 border-[#D69A24]/40 shadow-2xl bg-[#0E2920] group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2920] via-transparent to-black/30" />

            {/* Floating Glass Pills */}
            <div className="absolute top-6 left-6 bg-[#0E2920]/90 text-white border border-[#D69A24]/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
              <span className="text-[#D69A24]">🏺</span>
              <span>Traditional Bilona Churned</span>
            </div>

            <div className="absolute bottom-28 right-6 bg-[#173B2F]/95 text-white border border-[#D69A24]/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <span className="text-emerald-400">🌿</span>
              <span>100% Pure A2 Gir Milk</span>
            </div>

            {/* Quick Add Product Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0E2920]/95 backdrop-blur-xl border border-[#D69A24]/30 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
              <div>
                <h4 className="font-serif font-bold text-base text-[#FAF7F0]">Bilona A2 Cow Ghee</h4>
                <p className="text-xs text-[#D69A24] font-bold mt-0.5">
                  ₹1,299 / 500g • ★ 5.0 Rating
                </p>
              </div>
              <LocalizedClientLink
                href="/store"
                className="bg-[#D69A24] hover:bg-[#B87B10] text-[#173B2F] font-extrabold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1"
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
