import { getCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import HeaderAuth from "@modules/layout/components/header-auth"
import CartButton from "@modules/layout/components/cart-button"
import { Suspense } from "react"

export async function NavigationHeader() {
  const customer = await getCustomer().catch(() => null)

  return (
    <div className="sticky top-0 inset-x-0 z-[50] flex flex-col">
      {/* Main Navbar matching Suddha Ghee screenshot */}
      <div className="bg-[#FAF7F0] text-[#1C1917] py-3.5 px-4 small:px-8 border-b border-[#E5E0D8] shadow-sm">
        <header className="flex w-full content-container relative mx-auto justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center space-x-12">
            <LocalizedClientLink
              className="hover:opacity-90 flex items-center gap-3 group"
              href="/"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D69A24] text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
                🪔
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-xl tracking-wide text-[#1C1917]">
                  Suddha Ghee
                </span>
                <span className="text-[9px] font-sans font-extrabold tracking-widest text-[#D69A24] uppercase mt-1">
                  PURE &amp; TRADITIONAL
                </span>
              </div>
            </LocalizedClientLink>

            {/* Center Navigation Links */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-8 font-sans font-semibold text-sm text-[#52525B]">
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#D69A24] transition-colors"
                    href="/"
                  >
                    Home
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#D69A24] font-bold transition-colors"
                    href="/store"
                  >
                    Shop Ghee
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#D69A24] transition-colors"
                    href="/#story"
                  >
                    Our Story
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#D69A24] transition-colors"
                    href="/#story"
                  >
                    Our Process
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#D69A24] transition-colors"
                    href="/#quality"
                  >
                    Quality
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#D69A24] transition-colors"
                    href="/#recipes"
                  >
                    Recipes
                  </LocalizedClientLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex justify-end items-center gap-4">
            <Suspense fallback={<div className="w-20 h-8 rounded-lg bg-neutral-200 animate-pulse" />}>
              <HeaderAuth />
            </Suspense>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2"
                  href="/cart"
                ></LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </header>
      </div>
    </div>
  )
}
