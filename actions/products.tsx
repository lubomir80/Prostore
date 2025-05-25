"use server"

import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { convertToPlainObject } from "@/lib/utils";
import { PrismaClient } from "@prisma/client"


export const getLatestProduct = async () => {
   const prisma = new PrismaClient();

   const data = await prisma.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: { createdAt: "desc" }
   })

   return convertToPlainObject(data)
}