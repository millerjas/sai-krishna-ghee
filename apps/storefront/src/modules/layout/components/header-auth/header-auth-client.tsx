"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signout } from "@lib/data/customer"
import { useParams } from "next/navigation"
import { useTransition } from "react"

type HeaderAuthClientProps = {
  customer: any
}

export default function HeaderAuthClient({ customer }: HeaderAuthClientProps) {
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "us"
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await signout(countryCode, customer?.id)
    })
  }

  if (!customer) {
    return (
      <div className="flex items-center gap-3 font-sans text-sm font-semibold">
        <LocalizedClientLink
          href="/account?view=log-in"
          className="text-[#1C1917] hover:text-[#D69A24] transition-colors py-1.5 px-3 rounded-lg hover:bg-black/5"
        >
          Sign In
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/account?view=register"
          className="bg-[#D69A24] hover:bg-[#B87B10] text-[#173B2F] py-1.5 px-4 rounded-full transition-all shadow-sm font-bold text-xs uppercase tracking-wider"
        >
          Create Account
        </LocalizedClientLink>
      </div>
    )
  }

  const firstName =
    customer.first_name || customer.email?.split("@")[0] || "Customer"

  return (
    <div className="flex items-center gap-4 font-sans text-sm font-semibold text-[#1C1917]">
      {/* Greeting + Account link */}
      <LocalizedClientLink
        href="/account"
        className="flex items-center gap-2 bg-[#173B2F]/10 text-[#173B2F] hover:bg-[#173B2F]/20 py-1.5 px-3 rounded-full transition-all border border-[#173B2F]/20"
      >
        <span className="text-xs">👋</span>
        <span className="truncate max-w-[120px]">Hello, {firstName}</span>
      </LocalizedClientLink>

      {/* Orders */}
      <LocalizedClientLink
        href="/account/orders"
        className="hidden lg:flex items-center gap-1.5 text-[#52525B] hover:text-[#D69A24] transition-colors"
      >
        <span className="text-xs">📦</span>
        <span>Orders</span>
      </LocalizedClientLink>

      {/* Wishlist */}
      <LocalizedClientLink
        href="/account/wishlist"
        className="hidden lg:flex items-center gap-1.5 text-[#52525B] hover:text-[#D69A24] transition-colors"
      >
        <span className="text-xs">❤️</span>
        <span>Wishlist</span>
      </LocalizedClientLink>

      {/* Log Out */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 py-1.5 px-3 rounded-full transition-all cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-wait"
        title="Sign out of your account"
      >
        <span>{isPending ? "⏳" : "🚪"}</span>
        <span>{isPending ? "Signing out..." : "Log Out"}</span>
      </button>
    </div>
  )
}
