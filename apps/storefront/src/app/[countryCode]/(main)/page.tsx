import { Metadata } from "next"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import Hero from "@modules/home/components/hero"
import StorySection from "@modules/home/components/story"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

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

          {products.length > 0 && region ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductPreview key={product.id} product={product} region={region} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#71717A]">
              <p>No products available right now. Please check back soon!</p>
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
