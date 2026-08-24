import { checkSpendingLimit } from "@lib/util/check-spending-limit"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import { B2BCart, B2BCustomer } from "types/global"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import ItemsTemplate from "./items"
import Summary from "./summary"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart:
    | (B2BCart & {
        promotions?: HttpTypes.StorePromotion[]
      })
    | null
  customer: B2BCustomer | null
}) => {
  const spendLimitExceeded = checkSpendingLimit(cart, customer)

  return (
    <div className="small:py-12 py-6 bg-[#FAF7F0] min-h-screen">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div>
            <div className="flex flex-col py-6 gap-y-6">
              {/* Free Delivery Banner matching ghee-site */}
              <div className="bg-[#173B2F] text-[#FAF7F0] p-4 rounded-2xl border border-[#D69A24]/30 shadow-sm flex flex-col small:flex-row items-center justify-between gap-3">
                <div className="text-xs small:text-sm">
                  Add <strong>₹999</strong> for <strong>FREE delivery 🚚</strong>
                </div>
                <div className="w-full small:w-64 h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D69A24] rounded-full w-4/5"></div>
                </div>
              </div>

              <div className="pb-3 flex items-center justify-between border-b border-[#E5E0D8]">
                <Heading className="font-serif text-2xl font-bold text-[#1C1917]">
                  Your Cart 🪣 ({cart?.items?.length} {cart?.items?.length === 1 ? 'item' : 'items'})
                </Heading>
              </div>
              <div className="grid grid-cols-1 small:grid-cols-[1fr_380px] gap-8">
                <div className="flex flex-col gap-y-4">
                  {!customer && <SignInPrompt />}
                  <div className="bg-white rounded-3xl p-6 border border-[#E5E0D8] shadow-sm">
                    <ItemsTemplate cart={cart} />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex flex-col gap-y-8 sticky top-28 bg-white rounded-3xl p-6 border border-[#E5E0D8] shadow-sm">
                    {cart && cart.region && (
                      <Summary
                        cart={cart}
                        customer={customer}
                        spendLimitExceeded={spendLimitExceeded}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
