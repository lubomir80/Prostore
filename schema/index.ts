import * as z from "zod"


export const SignInFormSchema = z.object({
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must be at lease 6 characters")
})

export type TSignInFormSchema = z.infer<typeof SignInFormSchema>

export const SignUpFormSchema = z.object({
   name: z.string().min(3, "Name must be at least 3 characters"),
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must be at lease 6 characters"),
   confirmPassword: z.string().min(6, "Confirm Password must be at lease 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
   message: "Password don't match",
   path: ["confirmPassword"],
})

export type TSignUpFormSchema = z.infer<typeof SignUpFormSchema>