import { Metadata } from "next"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import Hero from "@modules/home/components/hero"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Sai Krishna Ghee | Pure Desi Cow Ghee - Divine Goodness",
  description:
    "Buy 100% pure Desi Cow Ghee made from fresh cow milk. Rich granular texture, divine natural aroma, and authentic purity.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const { response } = await getProductsList({
    countryCode,
    queryParams: { limit: 20 },
  }).catch(() => ({ response: { products: [], count: 0 }, nextPage: null }))

  const region = await getRegion(countryCode)
  const products = response.products || []

  return (
    <div className="flex flex-col gap-y-10 m-2">
      {/* Main Hero Banner */}
      <Hero />

      {/* ALL PRODUCTS SECTION (Directly under Hero) */}
      <section className="content-container py-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-xs font-black tracking-widest text-[#1D2B9A] uppercase bg-[#FFE500] px-3 py-1 rounded-full">
              OUR COMPLETE PRODUCT RANGE
            </span>
            <h2 className="text-3xl font-extrabold text-[#1D2B9A] mt-3 tracking-tight">
              Sai Krishna Pure Cow Ghee Products
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Select your preferred pack size — from 100g trial pouches to 5L bulk buckets.
            </p>
          </div>
          <LocalizedClientLink
            href="/store"
            className="text-xs font-bold text-[#1D2B9A] hover:underline uppercase tracking-wider"
          >
            View All Packs →
          </LocalizedClientLink>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const cheapestPrice = product.variants?.[0]?.calculated_price
              const formattedPrice = cheapestPrice
                ? `₹${cheapestPrice.calculated_amount || cheapestPrice.original_amount || 75}`
                : "₹75"

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <LocalizedClientLink href={`/products/${product.handle}`} className="block">
                    {/* Visual Packaging Badge */}
                    <div className="relative w-full h-48 rounded-xl bg-gradient-to-b from-[#121B6B]/5 to-[#1D2B9A]/10 flex items-center justify-center p-4 overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-200">
                      <div className="w-20 h-20 rounded-full bg-[#1D2B9A] text-[#FFE500] flex items-center justify-center font-black text-2xl shadow-md">
                        🧈
                      </div>
                      <span className="absolute top-2 right-2 bg-[#FFE500] text-[#1D2B9A] text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
                        100% PURE
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#1D2B9A] uppercase">
                        SAI KRISHNA GHEE
                      </span>
                      <h3 className="font-bold text-base text-neutral-900 group-hover:text-[#1D2B9A] transition-colors leading-snug line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-xs text-neutral-500 line-clamp-2 mt-1">
                        {product.description || "Fresh cow milk ghee with traditional rich granular texture and divine aroma."}
                      </p>
                    </div>
                  </LocalizedClientLink>

                  <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-semibold block uppercase">PRICE</span>
                      <span className="text-xl font-black text-[#1D2B9A]">
                        {formattedPrice}
                      </span>
                    </div>

                    <LocalizedClientLink
                      href={`/products/${product.handle}`}
                      className="px-4 py-2 bg-[#1D2B9A] hover:bg-[#121B6B] text-[#FFE500] font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      VIEW & BUY
                    </LocalizedClientLink>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Fallback Display Packets when database is seeding */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-40 rounded-xl bg-gradient-to-b from-[#121B6B]/5 to-[#1D2B9A]/10 flex items-center justify-center p-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#1D2B9A] text-[#FFE500] flex items-center justify-center font-black text-xl">
                    📦
                  </div>
                </div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#1D2B9A] uppercase">SAI KRISHNA GHEE</span>
                <h3 className="font-bold text-base text-neutral-900 mt-1">100g Pouch - Cow Ghee</h3>
                <p className="text-xs text-neutral-500 mt-1">Convenient stand-up pouch made from 100% cow milk.</p>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-lg font-black text-[#1D2B9A]">₹75</span>
                <LocalizedClientLink href="/store" className="px-4 py-2 bg-[#1D2B9A] text-[#FFE500] font-bold text-xs rounded-xl">
                  SELECT PACK
                </LocalizedClientLink>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-40 rounded-xl bg-gradient-to-b from-[#121B6B]/5 to-[#1D2B9A]/10 flex items-center justify-center p-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#1D2B9A] text-[#FFE500] flex items-center justify-center font-black text-xl">
                    🫙
                  </div>
                </div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#1D2B9A] uppercase">SAI KRISHNA GHEE</span>
                <h3 className="font-bold text-base text-neutral-900 mt-1">500ml Glass Jar - Cow Ghee</h3>
                <p className="text-xs text-neutral-500 mt-1">Premium glass jar preserving divine aroma and freshness.</p>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-lg font-black text-[#1D2B9A]">₹365</span>
                <LocalizedClientLink href="/store" className="px-4 py-2 bg-[#1D2B9A] text-[#FFE500] font-bold text-xs rounded-xl">
                  SELECT PACK
                </LocalizedClientLink>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-40 rounded-xl bg-gradient-to-b from-[#121B6B]/5 to-[#1D2B9A]/10 flex items-center justify-center p-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#1D2B9A] text-[#FFE500] flex items-center justify-center font-black text-xl">
                    🪣
                  </div>
                </div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#1D2B9A] uppercase">SAI KRISHNA GHEE</span>
                <h3 className="font-bold text-base text-neutral-900 mt-1">1L Tin / Jar - Cow Ghee</h3>
                <p className="text-xs text-neutral-500 mt-1">Family pack tin with tamper-evident seal and rich granular texture.</p>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-lg font-black text-[#1D2B9A]">₹720</span>
                <LocalizedClientLink href="/store" className="px-4 py-2 bg-[#1D2B9A] text-[#FFE500] font-bold text-xs rounded-xl">
                  SELECT PACK
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Brand Trust & Highlights Section */}
      <section className="bg-gradient-to-r from-[#121B6B]/5 via-[#1D2B9A]/10 to-[#121B6B]/5 rounded-2xl p-8 border border-[#1D2B9A]/20 my-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black tracking-widest text-[#1D2B9A] uppercase bg-[#FFE500] px-3 py-1 rounded-full">
            WHY SAI KRISHNA GHEE?
          </span>
          <h2 className="text-2xl font-black text-[#1D2B9A] mt-3">
            Pure Desi Cow Ghee - Divine Goodness
          </h2>
          <p className="text-xs text-neutral-600 mt-1">
            Crafted to perfection ensuring natural nutrients, rich aroma, and wholesome health benefits for your daily diet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#1D2B9A] text-[#FFE500] flex items-center justify-center font-bold text-xl mb-3">
              🥛
            </div>
            <h3 className="font-bold text-sm text-[#1D2B9A]">100% Cow Milk</h3>
            <p className="text-xs text-neutral-500 mt-1">Sourced from healthy milk cows</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#1D2B9A] text-[#FFE500] flex items-center justify-center font-bold text-xl mb-3">
              ✨
            </div>
            <h3 className="font-bold text-sm text-[#1D2B9A]">Granular Texture</h3>
            <p className="text-xs text-neutral-500 mt-1">Rich traditional danedar ghee</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#1D2B9A] text-[#FFE500] flex items-center justify-center font-bold text-xl mb-3">
              🍃
            </div>
            <h3 className="font-bold text-sm text-[#1D2B9A]">Zero Preservatives</h3>
            <p className="text-xs text-neutral-500 mt-1">No added chemicals or artificial color</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#1D2B9A] text-[#FFE500] flex items-center justify-center font-bold text-xl mb-3">
              🏅
            </div>
            <h3 className="font-bold text-sm text-[#1D2B9A]">FSSAI Approved</h3>
            <p className="text-xs text-neutral-500 mt-1">Tested for peak purity & safety</p>
          </div>
        </div>
      </section>
    </div>
  )
}
