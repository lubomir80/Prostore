import { auth } from "@/auth"
import { getMyCart } from "@/actions/cart"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import ShippingAddressForm from "./shipping-address-form"
// import { TShippingAddressSchema } from "@/schema/index"
// import { getUserById } from "@/actions/user"


export const metadata: Metadata = {
   title: "Shipping Address"
}


async function ShippingAddressPage() {
   const cart = await getMyCart();

   if (!cart || cart.items.length === 0) redirect("/cart")

   const session = await auth()

   const userId = session?.user?.id

   if (!userId) throw new Error("No user ID")

   // const user = getUserById(userId)

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
         <ShippingAddressForm address={defaultValues} />
      </>
   )
}

export default ShippingAddressPage