"use client"
import { TCartItem } from "@/schema/index"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { addItemToCart } from "@/actions/cart"



function AddToCart({ item }: { item: TCartItem }) {
   const router = useRouter()

   const handleAddToCart = async () => {
      const res = await addItemToCart(item);


      if (!res.success) {
         toast.error(res.message, {
            className: "toast-error"
         })
      }

      if (res.success) {
         toast.success(res.message, {
            className: "toast-success",
            action: {
               label: "Go to Cart",
               onClick: () => router.push("/cart"),
            },
         })
      }

   }


   return (
      <Button
         className="w-full"
         type="button"
         onClick={handleAddToCart}>
         <Plus />Add to cart
      </Button>
   )
}

export default AddToCart