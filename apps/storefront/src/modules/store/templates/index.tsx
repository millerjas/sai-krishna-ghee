import { HttpTypes } from "@medusajs/types"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Suspense } from "react"
import StoreBreadcrumb from "../components/store-breadcrumb"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  q,
  countryCode,
  categories,
}: {
  sortBy?: SortOptions
  page?: string
  q?: string
  countryCode: string
  categories?: HttpTypes.StoreProductCategory[]
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-[#FAF7F0] min-h-screen">
      {/* Shop Page Hero Banner matching ghee-site shop.html */}
      <div className="bg-[#173B2F] text-[#FAF7F0] py-12 px-6 text-center border-b border-[#D69A24]/30 shadow-md">
        <div className="content-container flex flex-col items-center">
          <span className="badge-gold mb-3">Purity Guaranteed</span>
          <h1 className="font-serif text-3xl small:text-5xl font-bold text-[#FAF7F0]">
            Shop Ghee — All Products
          </h1>
          <p className="text-sm small:text-base text-[#FAF7F0]/75 max-w-2xl mt-3 leading-relaxed">
            Browse our full range of premium Indian ghee — A2 Cow Ghee, Gir Cow Ghee, Bilona Ghee, Desi Cow Ghee, and Buffalo Ghee. Traditionally prepared, crafted with care.
          </p>
        </div>
      </div>

      <div
        className="flex flex-col py-8 content-container gap-6"
        data-testid="category-container"
      >
        <StoreBreadcrumb />
        <div className="flex flex-col small:flex-row small:items-start gap-8">
          <RefinementList sortBy={sort} categories={categories} />
          <div className="w-full">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                q={q}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
