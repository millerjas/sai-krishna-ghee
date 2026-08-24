import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer id="footer" className="bg-[#1C1917] text-[#FAF7F0] w-full pt-16 pb-8 border-t border-[#D69A24]/20">
      <div className="content-container flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <LocalizedClientLink href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#D69A24]/20 border border-[#D69A24]/40 text-[#D69A24] flex items-center justify-center text-xl">
                🪔
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-xl text-[#FAF7F0] group-hover:text-[#D69A24] transition-colors">
                  Suddha Ghee
                </span>
                <span className="text-[10px] font-sans font-medium tracking-widest text-[#D69A24] uppercase">
                  Pure &amp; Traditional
                </span>
              </div>
            </LocalizedClientLink>
            <p className="text-sm text-[#FAF7F0]/70 leading-relaxed max-w-xs">
              Authentic ghee, traditionally hand-churned using the ancient Bilona method from grass-fed farm milk. Prepared in small batches for exceptional aroma and purity.
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-serif font-semibold text-base mb-4 text-[#D69A24]">
              Products
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[#FAF7F0]/70">
              {product_categories && product_categories.length > 0 ? (
                product_categories.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink href={`/categories/${c.handle}`} className="hover:text-[#D69A24] transition-colors">
                      {c.name}
                    </LocalizedClientLink>
                  </li>
                ))
              ) : (
                <>
                  <li><LocalizedClientLink href="/store" className="hover:text-[#D69A24] transition-colors">A2 Cow Ghee</LocalizedClientLink></li>
                  <li><LocalizedClientLink href="/store" className="hover:text-[#D69A24] transition-colors">Gir Cow Ghee</LocalizedClientLink></li>
                  <li><LocalizedClientLink href="/store" className="hover:text-[#D69A24] transition-colors">Bilona Ghee</LocalizedClientLink></li>
                  <li><LocalizedClientLink href="/store" className="hover:text-[#D69A24] transition-colors">Desi Cow Ghee</LocalizedClientLink></li>
                </>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-base mb-4 text-[#D69A24]">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[#FAF7F0]/70">
              <li><LocalizedClientLink href="/" className="hover:text-[#D69A24] transition-colors">Home</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/store" className="hover:text-[#D69A24] transition-colors">Shop All Ghee</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/#story" className="hover:text-[#D69A24] transition-colors">Our Story</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/account" className="hover:text-[#D69A24] transition-colors">User Profile &amp; Orders</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/cart" className="hover:text-[#D69A24] transition-colors">Shopping Cart</LocalizedClientLink></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif font-semibold text-base mb-4 text-[#D69A24]">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-[#FAF7F0]/70">
              <li className="flex items-center gap-2">📞 +91 98765 43210</li>
              <li className="flex items-center gap-2">✉️ support@suddhaghee.com</li>
              <li className="flex items-center gap-2">📍 Bengaluru, Karnataka</li>
              <li className="flex items-center gap-2 text-xs text-[#D69A24] font-semibold mt-1">🏺 100% Traditional Bilona Churned</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#FAF7F0]/50 gap-4">
          <Text className="text-xs text-[#FAF7F0]/50">
            © {new Date().getFullYear()} Suddha Ghee. All rights reserved. Pure &amp; Traditional.
          </Text>
          <div className="flex items-center gap-2">
            <span>Crafted with care 🪔</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
