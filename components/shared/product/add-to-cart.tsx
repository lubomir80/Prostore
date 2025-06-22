"use client"
import { TCartItem } from "@/schema/index"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus, Minus, Loader } from "lucide-react"
import { toast } from "sonner"
import { addItemToCart, removeItemFromCart } from "@/actions/cart"
import { Cart } from "@/types"
import { useTransition } from "react"





function AddToCart({ cart, item }: { item: TCartItem, cart?: Cart }) {
   const router = useRouter()
   const [isPending, startTransition] = useTransition()

   const handleAddToCart = async () => {
      startTransition(async () => {
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
      })
   }

   const handleRemoveFromCart = async () => {
      startTransition(async () => {
         const res = await removeItemFromCart(item.productId)

         if (!res.success) {
            toast.error(res.message, {
               className: "toast-error"
            })
         }

         if (res.success) {
            toast.success(res.message, {
               className: "toast-success"
            })
         }
      })
   }


   const existItem = cart && cart.items.find(x => x.productId === item.productId)

   return existItem ? (
      <div className="flex gap-1">
         <Button
            disabled={isPending}
            type="button"
            variant="outline"
            onClick={handleRemoveFromCart}
            className="h-6 w-6">
            {isPending ?
               (<Loader className="w-6 h-6 animate-spin" />) :
               (<Minus className="w-6 h-6" />)}
         </Button>
         <span className="px-2">{existItem.qty}</span>
         <Button
            disabled={isPending}
            type="button"
            variant="outline"
            onClick={handleAddToCart}
            className="h-6 w-6">
            {isPending ?
               (<Loader className="w-6 h-6 animate-spin" />) :
               (<Plus className="w-6 h-6" />)}
         </Button>
      </div>
   ) : (
      <Button
         disabled={isPending}
         className="w-full"
         type="button"
         onClick={handleAddToCart}>
         {isPending ?
            (<Loader className="w-6 h-6 animate-spin" />) :
            (<Plus className="w-6 h-6" />)}Add to cart
      </Button >
   )
}

export default AddToCart