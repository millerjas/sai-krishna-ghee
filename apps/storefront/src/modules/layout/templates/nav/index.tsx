import { getCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FilePlus from "@modules/common/icons/file-plus"
import User from "@modules/common/icons/user"
import CartButton from "@modules/layout/components/cart-button"
import { RequestQuotePrompt } from "@modules/quotes/components/request-quote-prompt"
import { Suspense } from "react"
import NavSearch from "@modules/layout/components/nav-search"

export async function NavigationHeader() {
  const customer = await getCustomer().catch(() => null)

  return (
    <div className="sticky top-0 inset-x-0 group z-[20] bg-[#121B6B] text-white small:py-3.5 small:px-6 p-2.5 text-sm border-b border-white/10 shadow-md">
      <header className="flex w-full content-container relative small:mx-auto justify-between">
        <div className="small:mx-auto flex justify-between items-center min-w-full">
          {/* Left Brand Logo & Center Navigation */}
          <div className="flex items-center space-x-8">
            <LocalizedClientLink
              className="hover:opacity-90 flex items-center gap-2.5 group"
              href="/"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FFE500] text-[#1D2B9A] flex items-center justify-center font-bold text-lg shadow-md">
                🧈
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-lg tracking-wide text-white uppercase flex items-center gap-1.5">
                  Sai Krishna <span className="text-[#FFE500] font-extrabold text-xs bg-[#FFE500]/20 px-1.5 py-0.5 rounded border border-[#FFE500]/30">Ghee</span>
                </span>
                <span className="text-[9px] font-sans font-medium tracking-widest text-[#FFE500] uppercase">
                  DIVINE GOODNESS
                </span>
              </div>
            </LocalizedClientLink>

            <nav className="hidden md:block">
              <ul className="flex items-center space-x-8 font-sans font-medium text-sm text-slate-200">
                <li>
                  <LocalizedClientLink
                    className="text-[#FFE500] font-bold hover:text-[#FFE500]/80 transition-colors"
                    href="/"
                  >
                    Home
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#FFE500] transition-colors"
                    href="/store"
                  >
                    Shop Ghee
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#FFE500] transition-colors"
                    href="/store"
                  >
                    Our Story
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#FFE500] transition-colors"
                    href="/store"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right Utilities */}
          <div className="flex justify-end items-center gap-3">
            <Suspense fallback={null}>
              <NavSearch />
            </Suspense>

            <div className="h-4 w-px bg-white/20" />

            <RequestQuotePrompt>
              <button className="flex gap-1.5 items-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 px-2.5 py-1.5 text-xs transition-colors">
                <FilePlus />
                <span className="hidden small:inline-block">Quote</span>
              </button>
            </RequestQuotePrompt>

            <LocalizedClientLink
              className="hover:text-[#FFE500] transition-colors"
              href="/account"
            >
              <button className="flex gap-1.5 items-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 px-2.5 py-1.5 text-xs transition-colors">
                <User />
                <span className="hidden small:inline-block">
                  {customer ? customer.first_name : "Log in"}
                </span>
              </button>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                ></LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>
      </header>
    </div>
  )
}
