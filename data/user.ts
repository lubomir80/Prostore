"use server"

import { prisma } from "@/db/prisma"


export const getUserByEmail = async (email: string | undefined) => {
   try {
      const user = await prisma.user.findUnique({ where: { email } })
      return user
   } catch {
      return null
   }
}