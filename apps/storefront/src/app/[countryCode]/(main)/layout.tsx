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
      {/* 1. Announcement Bar at the very top of the site */}
      <div className="w-full bg-[#121B6B] text-white py-2 px-4 border-b border-[#FFE500]/30 text-xs tracking-wider uppercase font-medium text-center">
        <div className="content-container flex items-center justify-center gap-2">
          <span>PURE TRADITIONAL COW GHEE</span>
          <span className="text-[#FFE500]">―</span>
          <span className="text-[#FFE500] font-bold">CRAFTED WITH CARE</span>
          <span className="mx-2 text-white/30">|</span>
          <span>FREE DELIVERY ON ORDERS ABOVE ₹499</span>
        </div>
      </div>

      {/* 2. Navbar follows next */}
      <NavigationHeader />

      {props.children}
      <Footer />
    </>
  )
}
