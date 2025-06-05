"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { signIn, signOut } from "@/auth"
import { getUserByEmail } from "@/data/user"
import {
   SignInFormSchema,
   TSignInFormSchema,
   SignUpFormSchema,
   TSignUpFormSchema
} from "@/schema"
import { hashSync } from "bcrypt-ts"
import { prisma } from "@/db/prisma"



export async function signInCredentials(prevState: unknown, data: TSignInFormSchema) {
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


export async function signUpUser(prevState: unknown, data: TSignUpFormSchema) {
   const validatedFields = SignUpFormSchema.safeParse(data)

   if (!validatedFields.success) {
      return {
         success: false,
         message: "Invalid fields!"
      }
   }

   const { email, password, name } = validatedFields.data;
   const lowerCaseEmail = email.toLowerCase();
   const hashPassword = hashSync(password, 10)
   const userExists = await getUserByEmail(lowerCaseEmail)

   if (userExists) {
      return {
         success: false,
         message: "User has already exist!"
      }
   }

   try {
      await prisma.user.create({
         data: {
            name,
            email: lowerCaseEmail,
            password: hashPassword
         }
      })

      await signIn("credentials", {
         email: email,
         password: password
      })

      return {
         success: true,
         message: "User registered successfully"
      }

   } catch (error) {
      if (isRedirectError(error)) {
         throw error
      }
      return { success: false, message: "User was not registered!" }
   }
}


