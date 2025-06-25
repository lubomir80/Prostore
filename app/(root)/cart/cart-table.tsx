"use client"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { addItemToCart, removeItemFromCart } from "@/actions/cart"
import { Cart } from "@/types"
import { toast } from "sonner"
import { Loader, Minus, Plus, ArrowRight } from "lucide-react"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"


function CartTable({ cart }: { cart?: Cart }) {
   const router = useRouter()
   const [isPending, startTransition] = useTransition()



   return (
      <>
         <h1 className="py-4 h2-bold">Shopping cart</h1>
         {!cart || cart.items.length === 0 ? (
            <div>
               Cart is empty. <Link href="/">Go Shopping</Link>
            </div>
         ) : (
            <div className="grid md:grid-cols-4 md:gap-5">
               <div className="overflow-x-auto md:col-span-3">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Item</TableHead>
                           <TableHead className="text-center">Quantity</TableHead>
                           <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {cart.items.map((item) => {
                           return (
                              <TableRow key={item.name}>
                                 <TableCell className="font-medium">
                                    <Link href={`/product/${item.slug}`} className="flex items-center">
                                       <Image src={item.image} alt={item.name} width={50} height={50} />
                                       <span className="px-2">{item.name}</span>
                                    </Link>
                                 </TableCell>
                                 <TableCell className="flex-center   gap-2">
                                    <Button
                                       className="w-6 h-6"
                                       disabled={isPending}
                                       variant="outline"
                                       type="button"
                                       onClick={() => startTransition(async () => {
                                          const res = await removeItemFromCart(item.productId)
                                          if (!res.success) {
                                             toast.error(res.message, {
                                                className: "toast-error"
                                             })
                                          }
                                       })}>
                                       {isPending ?
                                          (<Loader className="animate-spin" />) :
                                          (<Minus />)}
                                    </Button>
                                    <span>{item.qty}</span>
                                    <Button
                                       className="w-6 h-6"
                                       disabled={isPending}
                                       variant="outline"
                                       type="button"
                                       onClick={() => startTransition(async () => {
                                          const res = await addItemToCart(item)
                                          if (!res.success) {
                                             toast.error(res.message, {
                                                className: "toast-error"
                                             })
                                          }
                                       })}>
                                       {isPending ?
                                          (<Loader className="animate-spin" />) :
                                          (<Plus />)}
                                    </Button>
                                 </TableCell>
                                 <TableCell className="text-right">
                                    ${item.price}
                                 </TableCell>
                              </TableRow>
                           )
                        })}
                     </TableBody>
                  </Table>
               </div>
               <Card>
                  <CardContent className="p-4 gap-4">
                     <div className="pb-3 text-xl flex flex-col items-center">
                        Subtotal ({cart.items.reduce((acc, qty) => acc + qty.qty, 0)})
                        <span className="font-bold">
                           {formatCurrency(cart.itemsPrice)}
                        </span>
                     </div>
                     <Button
                        className="w-full"
                        disabled={isPending}
                        onClick={() => startTransition(() => router.push("/shipping-address"))}>
                        {isPending ?
                           (<Loader className="w-4 h-4 animate-spin" />) :
                           (<ArrowRight className="w-4 h-4" />)} Proceed to Checkout
                     </Button>
                  </CardContent>
               </Card>
            </div>
         )}
      </>
   )
}

export default CartTable