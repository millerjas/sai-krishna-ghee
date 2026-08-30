"use client"

import { emptyCart } from "@lib/data/cart"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { ExclamationCircle } from "@medusajs/icons"
import { Container } from "@medusajs/ui"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"
import CartToCsvButton from "../components/cart-to-csv-button"
import { B2BCart, B2BCustomer } from "types/global"

type SummaryProps = {
  cart: B2BCart
  customer: B2BCustomer | null
}

const Summary = ({ cart, customer }: SummaryProps) => {
  const [isEmptyingCart, setIsEmptyingCart] = useState(false)
  const checkoutStep = getCheckoutStep(cart)
  const checkoutPath = checkoutStep
    ? `/checkout?step=${checkoutStep}`
    : "/checkout"

  const checkoutButtonLink = customer ? checkoutPath : "/account"

  const handleEmptyCart = async () => {
    setIsEmptyingCart(true)
    try {
      await emptyCart()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container className="flex flex-col gap-y-3">
      {/* <DiscountCode cart={cart} /> */}
      {/* <Divider /> */}
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={checkoutButtonLink}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10 rounded-full shadow-none">
          {customer ? "Checkout" : "Log in to Checkout"}
        </Button>
      </LocalizedClientLink>
      <CartToCsvButton cart={cart} />
      <Button
        onClick={handleEmptyCart}
        isLoading={isEmptyingCart}
        className="w-full h-10 rounded-full shadow-borders-base"
        variant="secondary"
      >
        Empty Cart
      </Button>
    </Container>
  )
}

export default Summary
