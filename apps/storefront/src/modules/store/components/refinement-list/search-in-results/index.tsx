"use client"

import { MagnifyingGlassMini } from "@medusajs/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

const SearchInResults = ({ listName }: { listName?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentQ = searchParams?.get("q") || ""
  const [query, setQuery] = useState(currentQ)

  useEffect(() => {
    setQuery(currentQ)
  }, [currentQ])

  const handleSearch = (term: string) => {
    setQuery(term)
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "")
    if (term.trim()) {
      params.set("q", term.trim())
      params.set("page", "1")
    } else {
      params.delete("q")
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  const placeholder = listName ? `Search in ${listName}` : "Search in products"

  return (
    <div className="group relative text-sm focus-within:border-neutral-500 rounded-t-lg focus-within:outline focus-within:outline-neutral-500">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 pr-8 focus:outline-none rounded-lg text-neutral-900 placeholder:text-neutral-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <MagnifyingGlassMini className="w-4 h-4 text-neutral-500" />
      </div>
    </div>
  )
}

export default SearchInResults

