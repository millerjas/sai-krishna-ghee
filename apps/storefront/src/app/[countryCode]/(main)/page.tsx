import { Metadata } from "next"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import Hero from "@modules/home/components/hero"
import StorySection from "@modules/home/components/story"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Suddha Ghee — Pure Traditional Indian Ghee | Artisanal A2 Cow Ghee",
  description:
    "Suddha Ghee offers authentic, traditionally prepared A2 Cow Ghee, Gir Cow Ghee, and Bilona Ghee. Pure, natural, and crafted with care.",
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
    <div className="flex flex-col gap-y-12">
      {/* Main Hero Banner */}
      <div className="content-container">
        <Hero />
      </div>

      {/* FLOATING PAPER CATALOG SECTION */}
      <section className="content-container py-4" id="products">
        <div className="paper-catalog-sheet">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4 border-b border-[#E5E0D8] pb-6">
            <div>
              <span className="badge-gold mb-2">
                OUR PRODUCTS
              </span>
              <h2 className="font-serif text-3xl small:text-4xl font-bold text-[#1C1917] mt-1">
                Explore Pure Traditional Ghee
              </h2>
              <p className="text-sm text-[#52525B] mt-1">
                Crafted with care, time-tested methods, and 100% natural farm fresh milk.
              </p>
            </div>
            <LocalizedClientLink
              href="/store"
              className="btn-secondary text-xs"
            >
              View Full Catalog →
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
                    className="group bg-white rounded-2xl p-5 border border-[#E5E0D8] shadow-sm hover:shadow-xl hover:border-[#D69A24] transition-all duration-200 flex flex-col justify-between"
                  >
                    <LocalizedClientLink href={`/products/${product.handle}`} className="block">
                      {/* Product Image Canvas */}
                      <div className="relative w-full h-48 rounded-xl bg-[#F4EFE6] flex items-center justify-center p-4 overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-200">
                        <div className="w-20 h-20 rounded-full bg-[#173B2F] text-[#D69A24] flex items-center justify-center font-bold text-2xl shadow-md">
                          🏺
                        </div>
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span className="badge-gold">Bestseller</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold tracking-widest text-[#D69A24] uppercase">
                          Suddha Ghee
                        </span>
                        <h3 className="font-serif font-bold text-base text-[#1C1917] group-hover:text-[#173B2F] transition-colors leading-snug line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-xs text-[#71717A] line-clamp-2 mt-1">
                          {product.description || "Authentic ghee, traditionally churned using ancient Bilona method."}
                        </p>
                      </div>
                    </LocalizedClientLink>

                    {/* Variant Pills */}
                    <div className="flex gap-1.5 mt-3 mb-2 flex-wrap">
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#FAF7F0] border border-[#E5E0D8] text-[#173B2F]">250g</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#173B2F] text-[#FAF7F0]">500g</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#FAF7F0] border border-[#E5E0D8] text-[#173B2F]">1kg</span>
                    </div>

                    <div className="pt-3 mt-2 border-t border-[#E5E0D8] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#71717A] font-semibold block uppercase">Price</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-[#1C1917]">
                            {formattedPrice}
                          </span>
                          <span className="text-[10px] text-[#71717A] line-through">₹1,499</span>
                        </div>
                      </div>

                      <LocalizedClientLink
                        href={`/products/${product.handle}`}
                        className="btn-primary text-xs !px-4 !py-2"
                      >
                        View Product
                      </LocalizedClientLink>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Fallback Display Cards */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm hover:border-[#D69A24] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-full h-44 rounded-xl bg-[#F4EFE6] flex items-center justify-center p-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#173B2F] text-[#D69A24] flex items-center justify-center font-bold text-xl">
                      🏺
                    </div>
                  </div>
                  <span className="badge-gold mb-2">Bilona Churned</span>
                  <h3 className="font-serif font-bold text-lg text-[#1C1917] mt-1">A2 Cow Ghee (500g)</h3>
                  <p className="text-xs text-[#71717A] mt-1">Hand-churned from grass-fed Gir cow A2 milk.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-lg font-bold text-[#1C1917]">₹1,299</span>
                  <LocalizedClientLink href="/store" className="btn-primary text-xs !px-4 !py-2">
                    Select Pack
                  </LocalizedClientLink>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm hover:border-[#D69A24] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-full h-44 rounded-xl bg-[#F4EFE6] flex items-center justify-center p-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#173B2F] text-[#D69A24] flex items-center justify-center font-bold text-xl">
                      🫙
                    </div>
                  </div>
                  <span className="badge-green mb-2">Traditional</span>
                  <h3 className="font-serif font-bold text-lg text-[#1C1917] mt-1">Gir Cow Bilona Ghee (1L)</h3>
                  <p className="text-xs text-[#71717A] mt-1">Golden aroma glass jar prepared in small batches.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-lg font-bold text-[#1C1917]">₹2,499</span>
                  <LocalizedClientLink href="/store" className="btn-primary text-xs !px-4 !py-2">
                    Select Pack
                  </LocalizedClientLink>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm hover:border-[#D69A24] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-full h-44 rounded-xl bg-[#F4EFE6] flex items-center justify-center p-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#173B2F] text-[#D69A24] flex items-center justify-center font-bold text-xl">
                      🪣
                    </div>
                  </div>
                  <span className="badge-gold mb-2">Family Pack</span>
                  <h3 className="font-serif font-bold text-lg text-[#1C1917] mt-1">Desi Cow Ghee (5L Tin)</h3>
                  <p className="text-xs text-[#71717A] mt-1">Authentic granular ghee sealed for long lasting freshness.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-lg font-bold text-[#1C1917]">₹5,999</span>
                  <LocalizedClientLink href="/store" className="btn-primary text-xs !px-4 !py-2">
                    Select Pack
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <StorySection />

      {/* TRUST BADGES SECTION */}
      <section className="content-container py-8">
        <div className="bg-white rounded-3xl p-8 border border-[#E5E0D8] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="badge-gold mb-2">
              WHY SUDDHA GHEE?
            </span>
            <h2 className="font-serif text-2xl small:text-3xl font-bold text-[#1C1917] mt-2">
              Pure Traditional Ghee — Crafted With Care
            </h2>
            <p className="text-xs text-[#71717A] mt-1">
              Crafted to perfection ensuring natural nutrients, rich aroma, and wholesome health benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E5E0D8] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#173B2F] text-[#D69A24] flex items-center justify-center font-bold text-xl mb-3">
                🥛
              </div>
              <h3 className="font-serif font-bold text-base text-[#1C1917]">100% Pure A2 Dairy</h3>
              <p className="text-xs text-[#71717A] mt-1">Sourced from grass-fed Gir cows</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E5E0D8] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#173B2F] text-[#D69A24] flex items-center justify-center font-bold text-xl mb-3">
                🏺
              </div>
              <h3 className="font-serif font-bold text-base text-[#1C1917]">Bilona Churned</h3>
              <p className="text-xs text-[#71717A] mt-1">Traditional wooden hand churning</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E5E0D8] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#173B2F] text-[#D69A24] flex items-center justify-center font-bold text-xl mb-3">
                ✨
              </div>
              <h3 className="font-serif font-bold text-base text-[#1C1917]">Rich Granular Texture</h3>
              <p className="text-xs text-[#71717A] mt-1">Natural golden aromatic ghee</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E5E0D8] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#173B2F] text-[#D69A24] flex items-center justify-center font-bold text-xl mb-3">
                🍃
              </div>
              <h3 className="font-serif font-bold text-base text-[#1C1917]">Zero Preservatives</h3>
              <p className="text-xs text-[#71717A] mt-1">No additives or artificial colors</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
