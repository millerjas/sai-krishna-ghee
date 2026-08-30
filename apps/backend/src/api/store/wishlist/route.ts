import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const customerId = req.auth_context?.actor_id
    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized", wishlist: [] })
    }

    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    const customer = await customerModuleService.retrieveCustomer(customerId)

    const wishlist = (customer.metadata as any)?.wishlist || []
    return res.json({ wishlist })
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Failed to fetch wishlist", wishlist: [] })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const customerId = req.auth_context?.actor_id
    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized", success: false })
    }

    const { item } = req.body as { item: any }
    if (!item || !item.product_id) {
      return res.status(400).json({ message: "Invalid wishlist item", success: false })
    }

    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    const customer = await customerModuleService.retrieveCustomer(customerId)

    const currentWishlist: any[] = (customer.metadata as any)?.wishlist || []

    const exists = currentWishlist.some((i) => i.product_id === item.product_id)
    let updatedWishlist = currentWishlist
    if (!exists) {
      updatedWishlist = [
        {
          ...item,
          added_at: new Date().toISOString(),
        },
        ...currentWishlist,
      ]
    }

    await customerModuleService.updateCustomers(customerId, {
      metadata: {
        ...(customer.metadata || {}),
        wishlist: updatedWishlist,
      },
    })

    return res.json({ wishlist: updatedWishlist, success: true })
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Failed to add to wishlist", success: false })
  }
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const customerId = req.auth_context?.actor_id
    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized", success: false })
    }

    const { product_id } = req.query as { product_id: string }
    if (!product_id) {
      return res.status(400).json({ message: "Product ID required", success: false })
    }

    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    const customer = await customerModuleService.retrieveCustomer(customerId)

    const currentWishlist: any[] = (customer.metadata as any)?.wishlist || []
    const updatedWishlist = currentWishlist.filter((i) => i.product_id !== product_id)

    await customerModuleService.updateCustomers(customerId, {
      metadata: {
        ...(customer.metadata || {}),
        wishlist: updatedWishlist,
      },
    })

    return res.json({ wishlist: updatedWishlist, success: true })
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Failed to remove from wishlist", success: false })
  }
}
