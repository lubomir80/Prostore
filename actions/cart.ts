"use server"

import { cookies } from 'next/headers';
import { cartItemSchema, insertCartSchema, TCartItem } from './../schema/index';
import { convertToPlainObject, formatError, round2 } from '@/lib/utils';
import { auth } from '@/auth';
import { prisma } from "@/db/prisma"
import { revalidatePath } from 'next/cache';

// Calculate cart prices 
const calcPrice = (items: TCartItem[]) => {
   const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
   )
   const shippingPrice = round2(itemsPrice < 100 ? 0 : 10)
   const taxPrice = round2(0.23 * itemsPrice)
   const totalPrice = round2(itemsPrice + taxPrice + shippingPrice)

   return {
      itemsPrice: Number(itemsPrice.toFixed(2)),
      shippingPrice: Number(shippingPrice.toFixed(2)),
      taxPrice: Number(taxPrice.toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2)),
   }
}

export const addItemToCart = async (data: TCartItem) => {
   try {
      const sessionCardId = (await cookies()).get("sessionCardId")?.value;
      if (!sessionCardId) throw new Error("Cart session not found")

      // Get session and user ID
      const session = await auth()
      const userId = session?.user?.id ? (session.user.id as string) : undefined

      const cart = await getMyCart()

      // parse and validate item

      const item = cartItemSchema.parse(data)

      const product = await prisma.product.findFirst({
         where: { id: item.productId }
      })

      if (!product) throw new Error("Product not found!")

      if (!cart) {

         const newCart = insertCartSchema.parse({
            userId,
            items: [item],
            sessionCardId,
            ...calcPrice([item])
         })

         // Add to database
         await prisma.cart.create({
            data: {
               ...newCart,
               sessionCardId: sessionCardId,
            }
         })

         revalidatePath(`/product/${product.slug}`)

         return {
            success: true,
            message: `Item ${product.name} added to cart`
         }
      } else {
         const existItem = (cart.items as TCartItem[])
            .find((x) => x.productId === item.productId)

         if (existItem) {
            if (product.stock < existItem.qty + 1) {
               throw new Error("Not enough stock")
            }
            (cart.items as TCartItem[]).find((x) => x.productId === item.productId)!.qty = existItem.qty + 1
         } else {
            if (product.stock < 1) throw new Error("Not enough stock")

            cart.items.push(item)
         }


         await prisma.cart.update({
            where: { id: cart.id },
            data: {
               items: cart.items,
               ...calcPrice(cart.items)
            }
         })

         revalidatePath(`/product/${product.slug}`)

         return {
            success: true,
            message: `${product.name} ${existItem ? "updated in" : "added to"}  cart`
         }
      }


   } catch (error) {
      return {
         success: false,
         message: formatError(error)
      }
   }

}


export async function getMyCart() {
   const sessionCardId = (await cookies()).get("sessionCardId")?.value;
   if (!sessionCardId) throw new Error("Cart session not found")

   // Get session and user ID
   const session = await auth()
   const userId = session?.user?.id ? (session.user.id as string) : undefined

   //Get user cart from database

   const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCardId: sessionCardId }
   })
   if (!cart) return undefined

   // Convert decimals 

   return convertToPlainObject({
      ...cart,
      items: cart.items as TCartItem[],
      itemsPrice: cart.itemsPrice.toString(),
      totalPrice: cart.totalPrice.toString(),
      shippingPrice: cart.shippingPrice.toString(),
      taxPrice: cart.taxPrice.toString(),
   })
}


export async function removeItemFromCart(productId: string) {
   try {
      const sessionCardId = (await cookies()).get("sessionCardId")?.value;
      if (!sessionCardId) throw new Error("Cart session not found");

      const product = await prisma.product.findFirst({
         where: { id: productId }
      })

      if (!product) throw new Error("Product not found")

      const cart = await getMyCart()
      if (!cart) throw new Error("Cart not found")

      const exist = (cart.items as TCartItem[]).find((x) => x.productId === productId)
      if (!exist) throw new Error("Item not found")

      if (exist.qty === 1) {
         cart.items = cart.items.filter(x => x.productId !== productId)
      } else {
         cart.items.find((x) => x.productId === productId)!.qty = exist.qty - 1
      }

      await prisma.cart.update({
         where: { id: cart.id },
         data: {
            items: cart.items,
            ...calcPrice(cart.items)
         }
      })

      revalidatePath(`/product/${product.slug}`)

      return {
         success: true,
         message: `${product.name} was removed from cart`
      }

   } catch (error) {
      return {
         success: false,
         message: formatError(error)
      }
   }
}