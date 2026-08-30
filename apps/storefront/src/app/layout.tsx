import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className="font-sans"
    >
      <body className="font-sans antialiased bg-[#FAF7F0] text-[#1C1917]">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
