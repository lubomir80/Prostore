import * as z from "zod"


export const SignInFormSchema = z.object({
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must be at lease 6 characters")
})

export type TSignInFormSchema = z.infer<typeof SignInFormSchema>