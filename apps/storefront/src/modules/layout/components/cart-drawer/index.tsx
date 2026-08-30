"use client"

import { checkSpendingLimit } from "@lib/util/check-spending-limit"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { convertToLocale } from "@lib/util/money"
import { LockClosedSolidMini } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Drawer, Text } from "@medusajs/ui"
import ItemsTemplate from "@modules/cart/templates/items"
import Button from "@modules/common/components/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ShoppingBag from "@modules/common/icons/shopping-bag"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { B2BCart, B2BCustomer } from "types/global"

type CartDrawerProps = {
  cart:
    | (B2BCart & {
        promotions?: HttpTypes.StorePromotion[]
      })
    | null
  customer: B2BCustomer | null
}

const CartDrawer = ({ cart, customer }: CartDrawerProps) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const items = cart?.items
  const totalItems = items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const subtotal = cart?.subtotal ?? 0
  const spendLimitExceeded = checkSpendingLimit(cart, customer)
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  const pathname = usePathname()

  const cancelTimer = () => {
    if (activeTimer) clearTimeout(activeTimer)
  }

  // Auto-open when item count changes (Add to Cart clicked)
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname?.includes("/cart")) {
      timedOpen()
      itemRef.current = totalItems
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems])

  // Close on navigation
  useEffect(() => {
    close()
  }, [pathname])

  const checkoutStep = cart ? getCheckoutStep(cart) : null
  const checkoutPath = customer
    ? checkoutStep
      ? `/checkout?step=${checkoutStep}`
      : "/checkout"
    : "/account?view=log-in"

  return (
    <div onMouseEnter={cancelTimer}>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={close}
        />
      )}
      <Drawer open={isOpen} onOpenChange={setIsOpen} {...({} as any)}>
        {/* Trigger: Cart icon always visible */}
        <Drawer.Trigger asChild>
          <button className="relative inline-flex items-center justify-center gap-x-1.5 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors">
            <ShoppingBag />
            <span className="text-sm font-normal hidden small:inline-block">
              {items && items.length > 0
                ? convertToLocale({
                    amount: subtotal,
                    currency_code: cart!.currency_code,
                  })
                : "Cart"}
            </span>
            {totalItems > 0 && (
              <div className="absolute -top-1 -right-1 bg-[#D69A24] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </div>
            )}
          </button>
        </Drawer.Trigger>

        {/* Drawer panel */}
        <Drawer.Content className="z-50 inset-y-0 sm:right-0 w-[90vw] sm:w-[420px] flex flex-col rounded-none m-0 p-0">
          <Drawer.Header className="border-b border-gray-100 px-5 py-4">
            <Drawer.Title className="font-serif font-bold text-lg text-[#1C1917]">
              {totalItems > 0
                ? `🛒 ${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`
                : "🛒 Your cart is empty"}
            </Drawer.Title>
          </Drawer.Header>

          <div className="flex flex-col h-full overflow-hidden">
            {cart && items && items.length > 0 ? (
              <>
                {/* Scrollable items */}
                <div className="flex-1 overflow-y-auto">
                  <ItemsTemplate cart={cart} showBorders={false} showTotal={false} />
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm">
                    <Text>Subtotal</Text>
                    <span className="font-bold text-[#1C1917] text-base">
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cart.currency_code,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA]">Shipping & taxes calculated at checkout</p>

                  <LocalizedClientLink href="/cart" onClick={close}>
                    <Button variant="secondary" className="w-full" size="large">
                      View Cart
                    </Button>
                  </LocalizedClientLink>

                  <LocalizedClientLink href={checkoutPath} onClick={close}>
                    <Button
                      className="w-full bg-[#173B2F] hover:bg-[#0F2820]"
                      size="large"
                      disabled={spendLimitExceeded}
                    >
                      <LockClosedSolidMini />
                      {!customer
                        ? "Log in to Checkout"
                        : spendLimitExceeded
                        ? "Spending Limit Exceeded"
                        : "Secure Checkout →"}
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              /* Empty cart */
              <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F5E6D3] flex items-center justify-center text-3xl">
                  🛒
                </div>
                <div>
                  <p className="font-serif font-bold text-[#1C1917] text-lg mb-1">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-[#71717A]">
                    Add some pure ghee to get started!
                  </p>
                </div>
                <LocalizedClientLink href="/store" onClick={close}>
                  <Button className="bg-[#D69A24] hover:bg-[#B87B10] text-white rounded-xl px-6">
                    Shop Now
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer>
    </div>
  )
}

export default CartDrawer
