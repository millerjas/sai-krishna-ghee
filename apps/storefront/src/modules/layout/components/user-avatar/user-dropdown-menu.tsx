"use client"

import { useState, useRef, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import User from "@modules/common/icons/user"
import Image from "next/image"
import { signout } from "@lib/data/customer"
import { useParams } from "next/navigation"

type UserDropdownMenuProps = {
  customer: any
}

export default function UserDropdownMenu({ customer }: UserDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { countryCode } = useParams() as { countryCode: string }

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!customer) {
    return (
      <LocalizedClientLink
        className="text-[#1C1917] hover:text-[#D69A24] transition-colors p-2 rounded-full hover:bg-black/5 flex items-center justify-center"
        href="/account"
        aria-label="User Account"
      >
        <User size={20} />
      </LocalizedClientLink>
    )
  }

  const avatarUrl =
    (customer.metadata?.avatar_url as string) ||
    (customer.metadata?.picture as string) ||
    null

  const initial = (
    customer.first_name?.[0] ||
    customer.email?.[0] ||
    "U"
  ).toUpperCase()

  const handleLogout = async () => {
    setIsOpen(false)
    await signout(countryCode || "us", customer.id)
  }

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
        aria-label="User Account Menu"
      >
        {avatarUrl ? (
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#D69A24] shadow-sm group-hover:scale-105 transition-transform">
            <Image
              src={avatarUrl}
              alt={customer.first_name || "User Avatar"}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#173B2F] border-2 border-[#D69A24] flex items-center justify-center font-serif font-bold text-xs text-[#D69A24] shadow-sm group-hover:scale-105 transition-transform">
            {initial}
          </div>
        )}
      </button>

      {/* Floating Dropdown Card */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-3 w-64 rounded-2xl bg-white border border-[#E5E0D8] shadow-xl p-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Profile Summary Header */}
          <div className="pb-3 mb-3 border-b border-[#E5E0D8] flex flex-col">
            <span className="badge-gold self-start text-[10px] uppercase font-bold tracking-wider mb-1">
              Active Session
            </span>
            <span className="font-serif font-bold text-base text-[#1C1917] truncate">
              {customer.first_name ? `Hello, ${customer.first_name} 👋` : "My Account"}
            </span>
            <span className="text-xs text-[#71717A] truncate">
              {customer.email}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 text-sm font-medium text-[#1C1917]">
            <LocalizedClientLink
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF7F0] hover:text-[#D69A24] transition-colors"
            >
              <span className="text-base">📊</span>
              <span>Account Overview</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/account/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF7F0] hover:text-[#D69A24] transition-colors"
            >
              <span className="text-base">📦</span>
              <span>My Orders &amp; Tracking</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/account/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF7F0] hover:text-[#D69A24] transition-colors"
            >
              <span className="text-base">❤️</span>
              <span>My Wishlist</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/account/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF7F0] hover:text-[#D69A24] transition-colors"
            >
              <span className="text-base">👤</span>
              <span>Profile Settings</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/account/addresses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF7F0] hover:text-[#D69A24] transition-colors"
            >
              <span className="text-base">📍</span>
              <span>Saved Addresses</span>
            </LocalizedClientLink>
          </div>

          {/* Log Out Button */}
          <div className="pt-3 mt-3 border-t border-[#E5E0D8]">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              <span className="text-base">🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
