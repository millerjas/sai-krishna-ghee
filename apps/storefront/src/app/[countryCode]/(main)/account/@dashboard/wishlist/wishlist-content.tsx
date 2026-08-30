"use client"

import { useState, useTransition } from "react"
import { removeFromWishlist, WishlistItem } from "@lib/data/wishlist"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading } from "@medusajs/ui"
import { useRouter } from "next/navigation"

type WishlistContentProps = {
  initialItems: WishlistItem[]
}

function WishlistContent({ initialItems }: WishlistContentProps) {
  const [items, setItems] = useState<WishlistItem[]>(initialItems)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleRemove = (productId: string) => {
    // Optimistic UI update
    setItems((prev) => prev.filter((i) => i.product_id !== productId))

    startTransition(async () => {
      const res = await removeFromWishlist(productId)
      if (res.wishlist) {
        setItems(res.wishlist)
      }
      router.refresh()
    })
  }

  return (
    <div className="w-full flex flex-col gap-y-6" data-testid="wishlist-page">
      <div className="flex flex-col gap-y-2 border-b border-gray-200 pb-4">
        <Heading level="h1" className="text-2xl font-bold text-neutral-900">
          My Saved Wishlist
        </Heading>
        <p className="text-sm text-neutral-600">
          Keep track of your favorite ghee variants saved for later.{" "}
          <span className="font-semibold text-[#B87A28]">
            {items.length} item{items.length !== 1 ? "s" : ""} saved.
          </span>
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-[#FDFBF7] rounded-2xl border border-[#E5E0D8] text-center px-4">
          <div className="w-16 h-16 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#B87A28] fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <Heading level="h3" className="text-lg font-semibold text-neutral-800 mb-2">
            Your wishlist is empty
          </Heading>
          <p className="text-sm text-neutral-600 max-w-sm mb-6">
            Explore our collection of pure A2 Desi Cow Ghee and save your favorite items here.
          </p>
          <LocalizedClientLink href="/store">
            <Button className="bg-[#B87A28] hover:bg-[#96621E] text-white px-6 py-2 rounded-xl">
              Explore Products
            </Button>
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-4 flex flex-col items-center">
                {item.thumbnail ? (
                  <div className="w-32 h-32 aspect-square mb-4 rounded-xl overflow-hidden bg-[#F9F6F0]">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 aspect-square mb-4 rounded-xl bg-[#F5E6D3] flex items-center justify-center text-[#B87A28] font-bold text-3xl">
                    🪔
                  </div>
                )}
                <h4 className="text-base font-semibold text-neutral-900 text-center mb-1 line-clamp-2">
                  {item.title}
                </h4>
                {item.price && (
                  <span className="text-sm font-bold text-[#B87A28] mb-2">
                    {item.price}
                  </span>
                )}
                <p className="text-xs text-neutral-400">
                  Saved{" "}
                  {new Date(item.added_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="p-4 border-t border-gray-100 flex gap-2">
                <LocalizedClientLink
                  href={`/products/${item.handle}`}
                  className="flex-1"
                >
                  <Button className="w-full bg-[#1C1917] hover:bg-neutral-800 text-white rounded-xl py-2 text-xs font-medium">
                    View Product
                  </Button>
                </LocalizedClientLink>
                <button
                  onClick={() => handleRemove(item.product_id)}
                  disabled={isPending}
                  className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  title="Remove from Wishlist"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WishlistContent
