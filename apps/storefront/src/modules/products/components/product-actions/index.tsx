"use client"

import { useParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ProductPrice from "../product-price"
import ProductVariantsTable from "../product-variants-table"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
}

export default function ProductActions({ product }: ProductActionsProps) {
  const countryCode = ((useParams() || {}) as { countryCode?: string }).countryCode || "in"

  return (
    <>
      <div className="flex flex-col gap-y-2 w-full">
        <ProductPrice product={product} />
        <ProductVariantsTable product={product} countryCode={countryCode} />
      </div>
    </>
  )
}
