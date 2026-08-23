import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreProductCategory, StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: { category: string[]; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export async function generateStaticParams() {
  const product_categories = await listCategories().catch(() => [])

  if (!product_categories || !product_categories.length) {
    return []
  }

  const countryCodes = await listRegions()
    .then((regions: StoreRegion[]) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )
    .catch(() => [])

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { product_categories } = await getCategoryByHandle(params.category)

    if (!product_categories || !product_categories.length) {
      return {
        title: "Ghee Categories | Sai Krishna Ghee",
        description: "Browse pure Desi Cow Ghee products from Sai Krishna Ghee.",
      }
    }

    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(" | ")

    const description =
      product_categories[product_categories.length - 1]?.description ??
      `${title} category - Sai Krishna Ghee.`

    return {
      title: `${title} | Sai Krishna Ghee`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch (error) {
    return {
      title: "Categories | Sai Krishna Ghee",
    }
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams

  const categories = (await listCategories().catch(() => [])) || []

  const currentCategory = categories.find(
    (category) => category.handle === params.category.join("/")
  )

  if (!currentCategory) {
    return (
      <CategoryTemplate
        categories={categories}
        currentCategory={categories[0]}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    )
  }

  return (
    <CategoryTemplate
      categories={categories}
      currentCategory={currentCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
