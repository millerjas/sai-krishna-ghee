"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cache } from "react"
import { B2BCustomer } from "types/global"
import {
  getAuthHeaders,
  getCacheHeaders,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"

const DEFAULT_COUNTRY = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

/** Safely extract a JWT string from any shape the Medusa SDK returns */
function extractToken(res: unknown): string | null {
  if (!res) return null
  if (typeof res === "string" && res.length > 10) return res
  if (typeof res === "object") {
    const obj = res as Record<string, any>
    const token = obj.token ?? obj.auth_token ?? obj.jwt ?? obj.access_token
    if (typeof token === "string" && token.length > 10) return token
  }
  return null
}

export const getCustomer = cache(
  async function (): Promise<B2BCustomer | null> {
    const authHeaders = getAuthHeaders()
    if (!("authorization" in authHeaders)) {
      return null
    }

    return await sdk.store.customer
      .retrieve(
        { fields: "*addresses,metadata" },
        { ...getCacheHeaders("customers"), ...authHeaders }
      )
      .then(({ customer }) => customer as B2BCustomer)
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.error("getCustomer error:", err?.message || err)
        }
        return null
      })
  }
)

export const updateCustomer = cache(async function (
  body: HttpTypes.StoreUpdateCustomer
) {
  const updateRes = await sdk.store.customer
    .update(body, {}, getAuthHeaders())
    .then(({ customer }) => customer)
    .catch(() => null)

  revalidatePath("/", "layout")
  return updateRes
})

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: (formData.get("phone") as string) || "",
  }

  try {
    // Step 1: Register the auth identity
    const registerRes: any = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    let token = extractToken(registerRes)

    // Step 2: Create the customer profile using the registration token
    const customHeaders: Record<string, string> = token
      ? { authorization: `Bearer ${token}` }
      : {}

    await sdk.store.customer.create(customerForm, {}, customHeaders)

    // Step 3: If no token from register (some Medusa versions), log in explicitly
    if (!token) {
      const loginRes: any = await sdk.auth.login("customer", "emailpass", {
        email: customerForm.email,
        password: password,
      })
      token = extractToken(loginRes)
    }

    if (!token) {
      return { success: false, error: "Account created but could not log in automatically. Please sign in." }
    }

    // Step 4: Persist the session cookie
    setAuthToken(token)

    // Step 5: Bust the layout cache so NavigationHeader re-renders with customer
    revalidatePath("/", "layout")

    redirect(`/${DEFAULT_COUNTRY}/store`)
  } catch (error: any) {
    // Next.js redirect throws — must be re-thrown
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error
    return { success: false, error: error.message || String(error) }
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const res: any = await sdk.auth.login("customer", "emailpass", {
      email,
      password,
    })

    const token = extractToken(res)

    if (!token) {
      // Medusa returns a non-token response on bad credentials
      return { success: false, error: "Invalid email or password." }
    }

    // Persist the session cookie
    setAuthToken(token)

    // Bust layout cache so header updates
    revalidatePath("/", "layout")

    redirect(`/${DEFAULT_COUNTRY}/store`)
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error
    return { success: false, error: error.message || "Invalid email or password." }
  }
}

export async function initiateGoogleAuth() {
  const backendUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  redirect(`${backendUrl}/auth/customer/google`)
}

export async function signout(countryCode: string, customerId?: string) {
  try {
    await sdk.auth.logout()
  } catch (_) {}
  removeAuthToken()
  removeCartId()  // clear cart so next user starts fresh
  revalidatePath("/", "layout")
  redirect(`/${countryCode}/account`)
}

export const addCustomerAddress = async (
  _currentState: unknown,
  formData: FormData
): Promise<any> => {
  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  return sdk.store.customer
    .createAddress(address, {}, getAuthHeaders())
    .then(({ customer }) => {
      revalidatePath("/", "layout")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string,
  customerId: string
): Promise<void> => {
  await sdk.store.customer
    .deleteAddress(addressId, getAuthHeaders())
    .then(() => {
      revalidatePath("/", "layout")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId = currentState.addressId as string
  const customerId = currentState.customerId as string

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, getAuthHeaders())
    .then(() => {
      revalidatePath("/", "layout")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
