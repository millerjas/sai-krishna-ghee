"use client"

import { useEffect, useState } from "react"
import Login from "@modules/account/components/login"
import Register from "@modules/account/components/register"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

export enum LOGIN_VIEW {
  LOG_IN = "log-in",
  REGISTER = "register",
}

const LoginTemplate = ({ regions }: { regions?: HttpTypes.StoreRegion[] }) => {
  const route = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(() => {
    const viewFromUrl = searchParams?.get("view") as LOGIN_VIEW
    return viewFromUrl && Object.values(LOGIN_VIEW).includes(viewFromUrl)
      ? viewFromUrl
      : LOGIN_VIEW.LOG_IN
  })

  useEffect(() => {
    if (searchParams?.has("view")) {
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.delete("view")
      router.replace(
        `${route}${newParams.toString() ? `?${newParams.toString()}` : ""}`,
        { scroll: false }
      )
    }
  }, [searchParams, route, router])

  const updateView = (view: LOGIN_VIEW) => {
    setCurrentView(view)
    router.push(`/account?view=${view}`)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Branded Suddha Ghee Card */}
        <div className="hidden md:flex flex-col justify-between bg-[#173B2F] text-[#FAF7F0] p-10 rounded-3xl min-h-[550px] shadow-lg border border-[#D69A24]/30 relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-4">
            <span className="badge-gold self-start text-xs uppercase tracking-widest">
              Suddha Ghee Authenticity
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-[#FAF7F0]">
              Pure Traditional A2 Cow Ghee
            </h1>
            <p className="text-sm text-[#FAF7F0]/80 leading-relaxed max-w-md">
              Made with 100% natural Gir cow milk using traditional Vedic wooden Bilona churning. 
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-col gap-1">
              <span className="text-xl">🥛</span>
              <span className="font-serif font-bold text-sm text-[#FAF7F0]">Grass-Fed A2 Milk</span>
              <span className="text-xs text-[#FAF7F0]/60">Pure Gir Cows</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xl">🏺</span>
              <span className="font-serif font-bold text-sm text-[#FAF7F0]">Bilona Churned</span>
              <span className="text-xs text-[#FAF7F0]/60">Granular & Aromatic</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Login / Register Component */}
        <div className="flex justify-center items-center">
          {currentView === LOGIN_VIEW.LOG_IN ? (
            <Login setCurrentView={updateView} />
          ) : (
            <Register setCurrentView={updateView} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
