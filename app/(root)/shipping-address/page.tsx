import { auth } from "@/auth"
import { getMyCart } from "@/actions/cart"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getUserById } from "@/actions/user"
import ShippingAddressForm from "./shipping-address-form"
import { TShippingAddressSchema } from "@/schema/index"
import CheckoutSteps from "@/components/shared/checkout-steps"


export const metadata: Metadata = {
   title: "Shipping Address"
}


async function ShippingAddressPage() {
   const cart = await getMyCart();

   if (!cart || cart.items.length === 0) redirect("/cart")

   const session = await auth()

   const userId = session?.user?.id

   if (!userId) throw new Error("No user ID")

   const user = getUserById(userId)
   const userAddress = (await user).address

   const defaultValues = {
      fullName: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      country: "",
      lat: undefined,
      lng: undefined,
   }


   return (
      <>
         <CheckoutSteps current={1} />
         <ShippingAddressForm
            address={userAddress as TShippingAddressSchema || defaultValues} />
      </>
   )
}

export default ShippingAddressPage