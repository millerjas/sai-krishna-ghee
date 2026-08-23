import { Metadata } from "next"

import { getBaseURL } from "@lib/util/env"
import { ArrowUpRightMini, ExclamationCircleSolid } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Footer from "@modules/layout/templates/footer"
import { NavigationHeader } from "@modules/layout/templates/nav"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <NavigationHeader />
      <div className="flex items-center text-white justify-center py-2.5 px-4 text-center bg-[#1D2B9A] border-b border-[#FFE500]/30 text-xs font-semibold tracking-wide">
        <div className="flex flex-col small:flex-row small:gap-3 gap-1 items-center">
          <span className="flex items-center gap-1.5 text-[#FFE500]">
            <span className="bg-[#FFE500] text-[#1D2B9A] text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded">PURE & NATURAL</span>
            100% Pure Desi Cow Ghee • Made From Fresh Cow Milk
          </span>
          <span className="hidden small:inline text-white/50">|</span>
          <span className="text-white/90 font-normal">
            Free Shipping on Orders Above ₹499
          </span>
        </div>
      </div>
      {props.children}
      <Footer />
    </>
  )
}
