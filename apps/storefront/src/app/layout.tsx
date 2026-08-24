import { getBaseURL } from "@lib/util/env"
import { Playfair_Display, Inter } from "next/font/google"
import { Metadata } from "next"
import "styles/globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
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
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased bg-[#FAF7F0] text-[#1C1917]">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
