import { getBaseURL } from "@lib/util/env"
import { Cormorant_Garamond, Quicksand } from "next/font/google"
import { Metadata } from "next"
import "styles/globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${cormorant.variable} ${quicksand.variable}`}
    >
      <body className="font-sans antialiased bg-[#FDFCFB] text-neutral-900">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
