"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { cache } from "react"
import { HttpTypes } from "@medusajs/types"
import { getCacheHeaders } from "./cookies"

export const listRegions = cache(async function () {
  return sdk.store.region
    .list({}, { ...getCacheHeaders("regions") })
    .then(({ regions }) => regions)
    .catch(medusaError)
})

export const retrieveRegion = cache(async function (id: string) {
  return sdk.store.region
    .retrieve(id, {}, { ...getCacheHeaders("regions") })
    .then(({ region }) => region)
    .catch(medusaError)
})

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = cache(async function (countryCode: string) {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions().catch(() => null)

    if (regions && regions.length) {
      regions.forEach((region) => {
        region.countries?.forEach((c) => {
          regionMap.set(c?.iso_2 ?? "", region)
        })
      })
    }

    let region = countryCode ? regionMap.get(countryCode) : regionMap.get("us")

    if (!region) {
      region = {
        id: "reg_default",
        name: "India",
        currency_code: "inr",
        countries: [{ iso_2: "us", name: "United States" }, { iso_2: "in", name: "India" }]
      } as any
    }

    return region
  } catch (e: any) {
    return {
      id: "reg_default",
      name: "India",
      currency_code: "inr",
      countries: [{ iso_2: "us", name: "United States" }, { iso_2: "in", name: "India" }]
    } as any
  }
})
