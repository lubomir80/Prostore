"use server"

import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { convertToPlainObject } from "@/lib/utils";
import { prisma } from "@/db/prisma"


export const getLatestProduct = async () => {
   const data = await prisma.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: { createdAt: "desc" }
   })

   return convertToPlainObject(data)
}


export const getProductBySlug = async (slug: string) => {
   return await prisma.product.findFirst(
      { where: { slug: slug } }
   )
}