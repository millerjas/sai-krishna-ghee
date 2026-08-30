"use client"

import { useState, useMemo, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { addToCartBulk } from "@lib/data/cart"
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@lib/data/wishlist"
import ProductReviewsSection from "@modules/products/components/reviews"
import { useRouter } from "next/navigation"

type SuddhaProductDetailProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
  customerId?: string | null  // null = guest, string = logged in
}

export default function SuddhaProductDetail({
  product,
  countryCode,
  customerId,
}: SuddhaProductDetailProps) {
  const router = useRouter()
  const variants = useMemo(() => product.variants || [], [product.variants])

  // Track active variant index
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (product?.id && customerId) {
      isInWishlist(product.id).then(setIsWishlisted)
    } else {
      setIsWishlisted(false)
    }
  }, [product?.id, customerId])

  // Currently selected variant
  const selectedVariant = variants[selectedVariantIndex] || variants[0] || null

  // Dynamic description
  const descriptionText =
    product.description ||
    product.subtitle ||
    (product.title?.toLowerCase().includes("buffalo")
      ? "Buffalo Ghee has a distinct richness and creamy texture. Traditionally prepared using buffalo milk, it has a deep, characteristic flavour that works beautifully in Indian sweets, rotis, and festive cooking."
      : "Authentic Indian Ghee traditionally prepared using ancient Bilona hand-churning methods. Pure, natural, and crafted with care for rich granular texture and divine aroma.")

  // Dynamic Prices from active variant or product
  const variantPriceObj = selectedVariant?.calculated_price || product.variants?.[0]?.calculated_price
  const priceVal =
    variantPriceObj?.calculated_amount ||
    variantPriceObj?.original_amount ||
    (selectedVariant as any)?.prices?.[0]?.amount ||
    499

  const rawMrp =
    variantPriceObj?.original_amount ||
    (selectedVariant as any)?.metadata?.mrp ||
    Math.round(priceVal * 1.34)

  const mrpVal = rawMrp > priceVal ? rawMrp : Math.round(priceVal * 1.34)
  const discountPercent =
    mrpVal > priceVal ? Math.round(((mrpVal - priceVal) / mrpVal) * 100) : 25

  // Dynamic Images list from Medusa Admin
  const images = useMemo(() => {
    const list: string[] = []
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (img.url && !list.includes(img.url)) list.push(img.url)
      })
    }
    if (product.thumbnail && !list.includes(product.thumbnail)) {
      list.unshift(product.thumbnail)
    }
    if (list.length === 0) {
      list.push("https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000&auto=format&fit=crop")
    }
    return list
  }, [product.images, product.thumbnail])

  const currentImage = images[selectedImageIndex] || images[0]

  // Dynamic Available Variant Options / Sizes
  const sizeOptions = useMemo(() => {
    if (variants.length > 0) {
      return variants.map((v, idx) => ({
        index: idx,
        id: v.id,
        label: v.title && v.title !== "Default Variant" ? v.title : `${250 * (idx + 1)}g`,
      }))
    }
    return []
  }, [variants])

  // Active Variant ID for Cart Actions (must be a valid variant_... ID)
  const activeVariantId = selectedVariant?.id || product.variants?.[0]?.id || null

  // Admin metadata ratings fallback
  const ratingVal = (product.metadata as any)?.rating || "4.6"
  const reviewCountVal = (product.metadata as any)?.review_count || "521"

  const categoryName =
    product.categories?.[0]?.name ||
    product.collection?.title ||
    (product.title?.toLowerCase().includes("buffalo") ? "BUFFALO GHEE" : "A2 COW GHEE")

  const handleAddToCart = async () => {
    if (!activeVariantId) {
      alert("Please select a valid variant before adding to cart.")
      return
    }
    setIsAdding(true)
    try {
      await addToCartBulk({
        lineItems: [{ variant_id: activeVariantId, quantity }],
        countryCode,
      })
    } catch (e: any) {
      console.error("Error adding to cart", e)
      alert(e?.message || "Failed to add product to cart.")
    } finally {
      setIsAdding(false)
    }
  }

  const handleBuyNow = async () => {
    if (!activeVariantId) {
      alert("Please select a valid variant.")
      return
    }
    setIsAdding(true)
    try {
      await addToCartBulk({
        lineItems: [{ variant_id: activeVariantId, quantity }],
        countryCode,
      })
      router.push(`/${countryCode}/checkout`)
    } catch (e: any) {
      console.error("Error with buy now", e)
      alert(e?.message || "Failed to proceed to checkout.")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-6 px-4 small:px-8">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-6 text-xs text-[#52525B] font-medium flex items-center gap-1.5 flex-wrap">
        <LocalizedClientLink href="/" className="hover:text-[#D69A24] transition-colors">
          Home
        </LocalizedClientLink>
        <span>›</span>
        <LocalizedClientLink href="/store" className="hover:text-[#D69A24] transition-colors">
          Shop
        </LocalizedClientLink>
        <span>›</span>
        <span className="text-[#1C1917] font-semibold">{product.title}</span>
      </div>

      {/* Main 2-Column Product Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-5 flex flex-col gap-4 max-w-md mx-auto lg:max-w-none w-full">
          <div className="relative w-full max-h-[480px] aspect-square rounded-3xl overflow-hidden bg-[#F4EFE6] border border-[#E5E0D8] shadow-sm flex items-center justify-center">
            <img
              src={currentImage}
              alt={product.title || "Suddha Ghee"}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Dynamic Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 flex-wrap">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? "border-[#D69A24] shadow-sm scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Controls */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Eyebrow Category */}
          <div className="text-xs font-bold text-[#D69A24] uppercase tracking-wider flex items-center gap-1">
            <span>✦</span>
            <span>{categoryName}</span>
          </div>

          {/* Dynamic Product Title */}
          <h1 className="font-serif text-4xl small:text-5xl font-bold text-[#1C1917] leading-tight tracking-tight">
            {product.title}
          </h1>

          {/* Rating & Reviews Row */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex text-[#D69A24] text-sm tracking-tighter">
              ★★★★★
            </div>
            <span className="text-[#52525B] font-semibold">
              {ratingVal} ({reviewCountVal} reviews)
            </span>
            <button
              onClick={() => {
                const el = document.getElementById("product-tabs")
                if (el) el.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-[#173B2F] font-bold hover:underline ml-1 cursor-pointer"
            >
              Read reviews
            </button>
          </div>

          {/* Dynamic Description Paragraph */}
          <p className="text-sm text-[#52525B] leading-relaxed">
            {descriptionText}
          </p>

          {/* Dynamic Price, MRP, and Discount Row */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="font-bold text-3xl text-[#1C1917]">
              ₹{priceVal}
            </span>
            <span className="text-sm text-[#71717A] line-through font-normal">
              MRP ₹{mrpVal}
            </span>
            {discountPercent > 0 && (
              <span className="bg-[#E8F5EF] text-[#1A7A45] px-3 py-1 rounded-full font-bold text-xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="h-px bg-[#E5E0D8] w-full my-1" />

          {/* Dynamic Size / Variant Selector */}
          {sizeOptions.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#1C1917]">Select Size:</span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {sizeOptions.map((opt) => {
                  const isActive = selectedVariantIndex === opt.index
                  return (
                    <button
                      key={opt.id + opt.index}
                      onClick={() => setSelectedVariantIndex(opt.index)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#173B2F] text-white shadow-sm font-bold"
                          : "bg-white text-[#1C1917] border border-[#E5E0D8] hover:border-[#173B2F]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs font-bold text-[#1C1917]">Quantity:</span>
            <div className="flex items-center gap-1 bg-[#F4EFE6] p-1 rounded-xl border border-[#E5E0D8]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white text-[#1C1917] font-bold text-sm flex items-center justify-center hover:bg-[#FAF7F0] shadow-2xs transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-bold text-[#1C1917]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white text-[#1C1917] font-bold text-sm flex items-center justify-center hover:bg-[#FAF7F0] shadow-2xs transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-[#D69A24] hover:bg-[#B87B10] text-white font-bold py-3.5 px-6 rounded-xl flex-1 flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
            >
              <span>{isAdding ? "ADDING..." : "ADD TO CART"}</span>
              <span>🛒</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isAdding}
              className="bg-[#173B2F] hover:bg-[#0E2920] text-white font-bold py-3.5 px-6 rounded-xl flex-1 flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
            >
              <span>BUY NOW →</span>
            </button>

            <button
              onClick={async () => {
                if (!customerId) {
                  router.push(`/${countryCode}/account?view=log-in`)
                  return
                }
                if (isWishlisted) {
                  setIsWishlisted(false)
                  await removeFromWishlist(product.id)
                } else {
                  setIsWishlisted(true)
                  const res = await addToWishlist({
                    id: `wish_${Date.now()}`,
                    product_id: product.id,
                    title: product.title || "Ghee Product",
                    handle: product.handle || "",
                    thumbnail: currentImage,
                  })
                  if (!res.success) {
                    setIsWishlisted(false)
                  }
                }
              }}
              className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg transition-all cursor-pointer shadow-sm ${
                isWishlisted
                  ? "bg-red-50 border-red-200 text-red-600 scale-105"
                  : "bg-white border-[#E5E0D8] hover:border-[#D69A24] text-neutral-400"
              }`}
              aria-label="Wishlist"
              title={
                !customerId
                  ? "Login to save to Wishlist"
                  : isWishlisted
                  ? "Remove from Wishlist"
                  : "Save to Wishlist"
              }
            >
              {isWishlisted ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Feature Checklist Card */}
          <div className="mt-4 p-5 rounded-2xl border border-[#E5E0D8] bg-white/80 space-y-2.5 text-xs font-medium text-[#1C1917] shadow-2xs">
            <div className="flex items-center gap-2 text-[#1A7A45]">
              <span>☑</span>
              <span className="text-[#1C1917]">Traditionally prepared</span>
            </div>
            <div className="flex items-center gap-2 text-[#1A7A45]">
              <span>☑</span>
              <span className="text-[#1C1917]">Quality checked before dispatch</span>
            </div>
            <div className="flex items-center gap-2 text-[#1A7A45]">
              <span>☑</span>
              <span className="text-[#1C1917]">Secure packaging for freshness</span>
            </div>
            <div className="flex items-center gap-2 text-[#1A7A45]">
              <span>🚚</span>
              <span className="text-[#1C1917]">Delivery across India (3–7 business days)</span>
            </div>
            <div className="flex items-center gap-2 text-[#1A7A45]">
              <span>↩</span>
              <span className="text-[#1C1917]">Easy returns within 7 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <ProductReviewsSection productId={product.id} />
      </div>
    </div>
  )
}
