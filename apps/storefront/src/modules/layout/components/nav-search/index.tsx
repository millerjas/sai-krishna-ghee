"use client"

import { MagnifyingGlassMini } from "@medusajs/icons"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"

export default function NavSearch() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const countryCode = (params?.countryCode as string) || "us"

  const [query, setQuery] = useState(searchParams?.get("q") || "")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${countryCode}/store?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push(`/${countryCode}/store`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative mr-2 hidden small:inline-flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="bg-neutral-100 text-neutral-900 placeholder:text-neutral-500 px-4 py-1.5 rounded-full pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B9A]/50 border border-neutral-200 hidden small:inline-block w-48 focus:w-64 transition-all duration-200"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-2.5 text-neutral-500 hover:text-[#1D2B9A] transition-colors"
      >
        <MagnifyingGlassMini className="w-4 h-4" />
      </button>
    </form>
  )
}
