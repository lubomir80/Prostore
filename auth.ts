import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"



export const { handlers, signIn, signOut, auth } = NextAuth({
   callbacks: {
      async session({ session, user, trigger, token }) {
         session.user.id = token.sub as string

         if (trigger === "update") {
            session.user.name = user.name
         }

         return session
      },
   },
   adapter: PrismaAdapter(prisma),
   session: { strategy: "jwt" },
   ...authConfig
}) 