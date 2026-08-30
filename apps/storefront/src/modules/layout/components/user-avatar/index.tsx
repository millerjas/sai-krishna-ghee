import { getCustomer } from "@lib/data/customer"
import UserDropdownMenu from "./user-dropdown-menu"

export default async function UserAvatar() {
  const customer = await getCustomer().catch(() => null)
  return <UserDropdownMenu customer={customer} />
}
