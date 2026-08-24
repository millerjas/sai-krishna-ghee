import { getProductsById } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewAddToCart from "./preview-add-to-cart"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const pricedProduct = (product.variants?.length ? product : null) || (await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  }).then((res) => res?.[0] || null).catch(() => null)) || product

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  const inventoryQuantity = pricedProduct.variants?.reduce((acc, variant) => {
    return acc + (variant?.inventory_quantity || 0)
  }, 0)

  return (
    <div className="group bg-white rounded-2xl p-5 border border-[#E5E0D8] shadow-sm hover:shadow-xl hover:border-[#D69A24] transition-all duration-200 flex flex-col justify-between h-full">
      <LocalizedClientLink href={`/products/${product.handle}`} className="block">
        {/* Product Image Canvas */}
        <div className="relative w-full aspect-square rounded-xl bg-[#F4EFE6] flex items-center justify-center p-4 overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-200">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={isFeatured}
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="badge-gold">Bestseller</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold tracking-widest text-[#D69A24] uppercase">
            Suddha Ghee
          </span>
          <h3 className="font-serif font-bold text-base text-[#1C1917] group-hover:text-[#173B2F] transition-colors leading-snug line-clamp-2" data-testid="product-title">
            {product.title}
          </h3>
          <p className="text-xs text-[#71717A] line-clamp-2 mt-1">
            {product.description || "Authentic ghee, traditionally churned using ancient Bilona method."}
          </p>
        </div>
      </LocalizedClientLink>

      <div className="pt-3 mt-4 border-t border-[#E5E0D8] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#71717A] font-semibold block uppercase">Price</span>
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
        <PreviewAddToCart product={product} region={region} />
      </div>
    </div>
  )
}
