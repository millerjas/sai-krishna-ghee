import { getCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FilePlus from "@modules/common/icons/file-plus"
import LogoIcon from "@modules/common/icons/logo"
import User from "@modules/common/icons/user"
import CartButton from "@modules/layout/components/cart-button"
import { RequestQuotePrompt } from "@modules/quotes/components/request-quote-prompt"
import { Suspense } from "react"

export async function NavigationHeader() {
  const customer = await getCustomer().catch(() => null)

  return (
    <div className="sticky top-0 inset-x-0 group z-[10] bg-white text-zinc-900 small:py-3 small:px-6 p-2 text-sm border-b shadow-sm border-neutral-200">
      <header className="flex w-full content-container relative small:mx-auto justify-between">
        <div className="small:mx-auto flex justify-between items-center min-w-full">
          <div className="flex items-center space-x-6">
            <LocalizedClientLink
              className="hover:opacity-90 flex items-center gap-2.5 group"
              href="/"
            >
              <LogoIcon className="inline" />
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-base tracking-wide text-[#1D2B9A] uppercase flex items-center gap-1">
                  Sai <span className="text-[#1D2B9A]">KRISHNA</span>
                  <span className="text-xs bg-[#FFE500] text-[#1D2B9A] px-1.5 py-0.5 rounded font-bold ml-1">
                    Ghee
                  </span>
                </span>
                <span className="text-[9px] font-medium tracking-widest text-[#1D2B9A]/80 uppercase">
                  DIVINE GOODNESS
                </span>
              </div>
            </LocalizedClientLink>

            <nav>
              <ul className="space-x-6 hidden small:flex font-medium text-neutral-700 text-sm">
                <li>
                  <LocalizedClientLink
                    className="hover:text-[#1D2B9A] transition-colors font-bold text-[#1D2B9A]"
                    href="/store"
                  >
                    All Products
                  </LocalizedClientLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex justify-end items-center gap-2">
            <div className="relative mr-2 hidden small:inline-flex">
              <input
                type="text"
                placeholder="Search for products"
                className="bg-gray-100 text-white px-4 py-2 rounded-full pr-10 shadow-borders-base hidden small:inline-block"
              />
            </div>

            <div className="h-4 w-px bg-neutral-300" />

            <RequestQuotePrompt>
              <button className="flex gap-1.5 items-center rounded-2xl bg-none shadow-none border-none hover:bg-neutral-100 px-2 py-1">
                <FilePlus />
                <span className="hidden small:inline-block">Quote</span>
              </button>
            </RequestQuotePrompt>

            <LocalizedClientLink
              className="hover:text-ui-fg-base"
              href="/account"
            >
              <button className="flex gap-1.5 items-center rounded-2xl bg-none shadow-none border-none hover:bg-neutral-100 px-2 py-1">
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
