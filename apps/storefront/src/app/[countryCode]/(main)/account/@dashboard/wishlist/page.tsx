import { getCustomer } from "@lib/data/customer"
import { getWishlist } from "@lib/data/wishlist"
import { notFound } from "next/navigation"
import WishlistContent from "./wishlist-content"

export default async function WishlistPage() {
  const customer = await getCustomer().catch(() => null)
  if (!customer) notFound()

  const items = await getWishlist()

  return <WishlistContent initialItems={items} />
}
