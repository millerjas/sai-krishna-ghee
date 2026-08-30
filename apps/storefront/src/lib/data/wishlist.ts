"use server"

import { revalidatePath } from "next/cache"
import { getAuthHeaders } from "./cookies"

export interface WishlistItem {
  id: string
  product_id: string
  title: string
  handle: string
  thumbnail?: string
  price?: string
  added_at: string
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

function getHeaders() {
  const auth = getAuthHeaders()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...auth,
  }
  if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] =
      process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  }
  return headers
}

/** Get current customer's wishlist from Medusa backend (accessible from any device) */
export async function getWishlist(): Promise<WishlistItem[]> {
  const headers = getHeaders()
  if (!("authorization" in headers)) {
    return []
  }

  try {
    const res = await fetch(`${BACKEND_URL}/store/wishlist`, {
      method: "GET",
      headers,
      cache: "no-store",
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.wishlist || []
  } catch (err) {
    console.error("Failed to fetch wishlist:", err)
    return []
  }
}

/** Add item to customer's wishlist in Medusa backend */
export async function addToWishlist(
  item: Omit<WishlistItem, "added_at">
): Promise<{ success: boolean; requiresLogin?: boolean; wishlist?: WishlistItem[] }> {
  const headers = getHeaders()
  if (!("authorization" in headers)) {
    return { success: false, requiresLogin: true }
  }

  try {
    const res = await fetch(`${BACKEND_URL}/store/wishlist`, {
      method: "POST",
      headers,
      body: JSON.stringify({ item }),
    })
    if (!res.ok) {
      if (res.status === 401) return { success: false, requiresLogin: true }
      return { success: false }
    }
    const data = await res.json()
    revalidatePath("/", "layout")
    return { success: true, wishlist: data.wishlist || [] }
  } catch (err) {
    console.error("Failed to add to wishlist:", err)
    return { success: false }
  }
}

/** Remove item from customer's wishlist in Medusa backend */
export async function removeFromWishlist(
  productId: string
): Promise<{ success: boolean; wishlist?: WishlistItem[] }> {
  const headers = getHeaders()
  if (!("authorization" in headers)) {
    return { success: false }
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/store/wishlist?product_id=${encodeURIComponent(productId)}`,
      {
        method: "DELETE",
        headers,
      }
    )
    if (!res.ok) return { success: false }
    const data = await res.json()
    revalidatePath("/", "layout")
    return { success: true, wishlist: data.wishlist || [] }
  } catch (err) {
    console.error("Failed to remove from wishlist:", err)
    return { success: false }
  }
}

/** Check if product is in customer's wishlist */
export async function isInWishlist(productId: string): Promise<boolean> {
  const items = await getWishlist()
  return items.some((i) => i.product_id === productId)
}
