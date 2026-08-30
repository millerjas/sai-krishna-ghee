import { HttpTypes } from "@medusajs/types"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"
import SuddhaProductDetail from "../components/suddha-product-detail"
import { getCustomer } from "@lib/data/customer"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Fetch customer server-side so wishlist button knows login state
  const customer = await getCustomer().catch(() => null)

  return (
    <div className="bg-[#FAF7F0] min-h-screen pb-12 flex flex-col gap-y-8">
      {/* Product Detail Main View */}
      <SuddhaProductDetail
        product={product}
        countryCode={countryCode}
        customerId={customer?.id ?? null}
      />

      {/* Tabs & Additional Specs Section */}
      <div className="content-container" id="product-tabs">
        <div className="bg-white rounded-3xl p-8 border border-[#E5E0D8] shadow-sm">
          <ProductTabs product={product} />
        </div>
      </div>

      {/* Related Products */}
      <div
        className="content-container"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
