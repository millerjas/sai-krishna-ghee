"use client"

import { removeFromWishlist } from "@lib/data/wishlist"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

export default function WishlistRemoveButton({
  productId,
}: {
  productId: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleRemove = () => {
    startTransition(async () => {
      await removeFromWishlist(productId)
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
      title="Remove from Wishlist"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </button>
  )
}
