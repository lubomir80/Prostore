import CartTable from "./cart-table"
import { getMyCart } from "@/actions/cart"

async function CartPage() {
   const cart = await getMyCart()

   return (
      <div>
         <CartTable cart={cart} />
      </div>
   )
}

export default CartPage