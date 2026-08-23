import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-neutral-200 bg-[#0A1045] text-white w-full mt-12">
      <div className="content-container flex flex-col w-full py-12">
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between">
          <div className="max-w-sm flex flex-col gap-y-3">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-[#FFE500] font-black uppercase text-xl tracking-wider"
            >
              Sai KRISHNA Ghee
            </LocalizedClientLink>
            <p className="text-xs text-blue-200 leading-relaxed">
              Divine Goodness in every spoon. Manufactured with extreme care using 100% pure cow milk for superior granular texture, divine aroma, and authentic taste.
            </p>
            <div className="text-xs text-yellow-300 font-semibold pt-1">
              📍 Manufacturing Unit & Office: India
            </div>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-[#FFE500] font-bold uppercase tracking-wider text-xs">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-blue-100 text-xs hover:text-[#FFE500]"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-[#FFE500] transition-colors",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-[#FFE500] transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-[#FFE500] font-bold uppercase tracking-wider text-xs">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-blue-100 text-xs",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-[#FFE500] transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="txt-small-plus text-[#FFE500] font-bold uppercase tracking-wider text-xs">Purity & Trust</span>
              <ul className="grid grid-cols-1 gap-y-2 text-blue-100 text-xs">
                <li className="hover:text-[#FFE500] cursor-pointer">FSSAI Certified</li>
                <li className="hover:text-[#FFE500] cursor-pointer">100% Cow Milk Guaranteed</li>
                <li className="hover:text-[#FFE500] cursor-pointer">No Added Colors or Flavors</li>
                <li className="hover:text-[#FFE500] cursor-pointer">Bulk / Wholesale Enquiry</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full mt-12 pt-6 border-t border-white/10 justify-between items-center text-xs text-blue-200 gap-4">
          <Text className="txt-compact-small text-blue-200">
            © {new Date().getFullYear()} Sai Krishna Ghee. All rights reserved. Divine Goodness.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
