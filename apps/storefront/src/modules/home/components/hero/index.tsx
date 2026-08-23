"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative min-h-[70vh] w-full bg-gradient-to-br from-[#121B6B] via-[#1D2B9A] to-[#0A1045] text-white overflow-hidden rounded-2xl shadow-xl my-3">
      {/* Decorative background circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFE500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="content-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-16 px-6 lg:px-12">
        {/* Left Column: Hero Copy & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <div className="inline-flex items-center gap-2 bg-[#FFE500] text-[#1D2B9A] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#1D2B9A] animate-pulse"></span>
            100% PURE COW MILK GHEE
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-tight">
            DIVINE GOODNESS <br />
            <span className="text-[#FFE500] underline decoration-[#FFE500]/40">IN EVERY SPOON</span>
          </h1>

          <p className="text-lg text-blue-100 max-w-xl font-normal leading-relaxed">
            Made from pure cow milk with traditional care. Sai Krishna Ghee delivers a rich golden granular texture, divine natural aroma, and essential nutritional goodness for your family.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <LocalizedClientLink
              href="/store"
              className="px-8 py-4 bg-[#FFE500] hover:bg-[#ebd300] text-[#1D2B9A] font-extrabold text-base rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              SHOP COW GHEE NOW
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/store"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-xl border border-white/30 backdrop-blur-sm transition-all"
            >
              EXPLORE PACK SIZES
            </LocalizedClientLink>
          </div>

          {/* Quick Purity Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 w-full text-xs font-semibold text-blue-100">
            <div className="flex items-center gap-1.5">
              <span className="text-[#FFE500]">✓</span> Fresh Cow Milk
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#FFE500]">✓</span> Rich Granular Texture
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#FFE500]">✓</span> Zero Preservatives
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#FFE500]">✓</span> FSSAI Certified
            </div>
          </div>
        </div>

        {/* Right Column: Visual Product Showcase Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#FFE500] text-[#1D2B9A] flex items-center justify-center shadow-xl">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C7 2 5 6.5 5 11.5C5 16.5 8.1 20 12 20C15.9 20 19 16.5 19 11.5C19 9 18 6.5 16 4.5C16 7.5 14 9 12 9C10 9 9 7.5 9 6C9 4 10.5 2.5 12 2Z" />
              </svg>
            </div>

            <div>
              <span className="text-[#FFE500] font-black tracking-widest text-xs uppercase">SIGNATURE PACK</span>
              <h3 className="text-2xl font-black text-white mt-1">SAI KRISHNA COW GHEE</h3>
              <p className="text-xs text-blue-200 mt-1">Available in 100g Pouch, 250ml, 500ml, 1L & 5L Packs</p>
            </div>

            <div className="w-full bg-[#121B6B]/80 rounded-2xl p-4 border border-[#FFE500]/40 flex items-center justify-between text-left">
              <div>
                <p className="text-[11px] text-blue-200 uppercase tracking-wider font-semibold">Special Offer</p>
                <p className="text-sm font-bold text-white">100g Pouch Available</p>
              </div>
              <span className="bg-[#FFE500] text-[#1D2B9A] font-black text-xs px-3 py-1.5 rounded-lg">
                TRY NOW
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
