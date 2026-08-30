import { HttpTypes } from "@medusajs/types"

export type StoreCustomer = HttpTypes.StoreCustomer & {
  orders?: HttpTypes.StoreOrder[]
}

export type StoreCart = HttpTypes.StoreCart

// Backward compatibility alias for B2C customer and cart
export type B2BCustomer = StoreCustomer
export type B2BCart = StoreCart


