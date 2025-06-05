"use server"

import { signIn, signOut } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { SignInFormSchema, TSignInFormSchema } from "@/schema"
import { isRedirectError } from "next/dist/client/components/redirect-error"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function signInCredentials(prevState: unknown, data: TSignInFormSchema) {

   await delay(1000)

   const validatedFields = SignInFormSchema.safeParse(data)

   if (!validatedFields.success) {
      return {
         success: false,
         message: "Invalid fields!"
      }
   }

   const { email, password } = validatedFields.data;
   const lowerCaseEmail = email.toLowerCase();
   const userExists = await getUserByEmail(lowerCaseEmail)

   if (!userExists || !userExists.email || !userExists.password) {
      return {
         success: false,
         message: "User doesn't exist, please make registration!"
      }
   }

   try {
      await signIn("credentials", {
         email: userExists.email,
         password
      });

      return { success: true, message: "Signed in successfully" }
   } catch (error) {
      if (isRedirectError(error)) {
         throw error
      }
      return { success: false, message: "Invalid credentials" }
   }
}


export async function signOutUser() {
   await signOut()
}