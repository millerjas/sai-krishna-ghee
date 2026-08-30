import { getCustomer } from "@lib/data/customer"
import HeaderAuthClient from "./header-auth-client"

export default async function HeaderAuth() {
  const customer = await getCustomer().catch(() => null)
  return <HeaderAuthClient customer={customer} />
}
