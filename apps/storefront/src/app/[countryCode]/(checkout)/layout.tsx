import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-[#F4EFE6] relative min-h-screen">
      {/* Checkout Header matching ghee-site checkout.html */}
      <div className="bg-[#173B2F] text-[#FAF7F0] py-4 px-6 border-b border-[#D69A24]/30 shadow-md">
        <nav className="flex items-center content-container justify-between">
          <LocalizedClientLink href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#D69A24]/20 border border-[#D69A24]/40 text-[#D69A24] flex items-center justify-center text-lg shadow-inner">
              🪔
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-bold text-xl text-[#FAF7F0] group-hover:text-[#D69A24] transition-colors">
                Suddha Ghee
              </span>
              <span className="text-[9px] font-sans font-medium tracking-widest text-[#D69A24] uppercase">
                Secure Checkout
              </span>
            </div>
          </LocalizedClientLink>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#D69A24] bg-[#FAF7F0]/10 border border-[#D69A24]/30 px-3 py-1.5 rounded-full">
            <span>🔒 256-Bit SSL Encryption</span>
          </div>
        </nav>
      </div>

      <div className="relative bg-[#F4EFE6] py-8" data-testid="checkout-container">
        {children}
      </div>

      <div className="py-6 w-full text-center text-xs text-[#71717A] border-t border-[#E5E0D8] bg-[#FAF7F0]">
        © {new Date().getFullYear()} Suddha Ghee. All rights reserved. 🪔 Pure &amp; Traditional.
      </div>
    </div>
  )
}
