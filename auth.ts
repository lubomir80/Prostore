import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"



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
      },
      authorized({ request, auth }: any) {
         // check for session cart cookie
         if (!request.cookies.get("sessionCardId")) {
            // Generate new session cart id cookie
            const sessionCardId = crypto.randomUUID()

            //Clone the req headers
            const newRequestHeaders = new Headers(request.headers)

            const response = NextResponse.next({
               request: {
                  headers: newRequestHeaders
               }
            });

            //Set newly generated sessionCardId in the response cookies

            response.cookies.set("sessionCardId", sessionCardId)

            return response
         } else {
            return true
         }
      }
   },
   adapter: PrismaAdapter(prisma),
   session: { strategy: "jwt" },
   ...authConfig
}) 