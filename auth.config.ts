import { compareSync } from "bcrypt-ts"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user"
// import Github from "next-auth/providers/github"
// import Google from "next-auth/providers/google"

export default {
   providers: [
      Credentials({
         credentials: {
            email: { type: "email" },
            password: { type: "password" }
         },
         async authorize(credentials) {
            if (credentials == null) return null

            const { email, password } = credentials

            const user = await getUserByEmail(email as string)

            if (user && user.password) {
               const isMatch = compareSync(password as string, user.password)

               if (isMatch) {
                  return {
                     id: user.id,
                     name: user.name,
                     email: user.email,
                     role: user.role
                  }
               }
            }

            return null
         }
      }),
   ],
} satisfies NextAuthConfig