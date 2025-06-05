import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"



export const { handlers, signIn, signOut, auth } = NextAuth({
   callbacks: {
      async session({ session, user, trigger, token }) {
         session.user.id = token.sub as string
         session.user.name = token.name as string
         session.user.role = token.role as "admin" | "user"

         if (trigger === "update") {
            session.user.name = user.name
         }

         return session
      },
      async jwt({ token, user }) {
         if (user) {
            token.role = user.role;

            if (user.name === "NO_NAME") {
               token.name = user.email!.split("@")[0]
            }

            if (typeof token.name === "string") {
               await prisma.user.update({
                  where: { id: user.id },
                  data: { name: token.name }
               })
            }
         }
         return token
      }
   },
   adapter: PrismaAdapter(prisma),
   session: { strategy: "jwt" },
   ...authConfig
}) 