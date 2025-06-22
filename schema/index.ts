import * as z from "zod"


const currency = z.number().positive("Must be positive number")

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



// CART SCHEMA


export const cartItemSchema = z.object({
   productId: z.string().min(1, "Product is required"),
   name: z.string().min(1, "Name is required"),
   slug: z.string().min(1, "Slug is required"),
   qty: z.number().int().nonnegative("Quantity must be a positive number"),
   image: z.string().min(1, "Image is required"),
   price: currency,
})

export type TCartItem = z.infer<typeof cartItemSchema>

export const insertCartSchema = z.object({
   items: z.array(cartItemSchema),
   itemsPrice: currency,
   totalPrice: currency,
   shippingPrice: z.number().nonnegative("Value must be 0 or greater"),
   taxPrice: currency,
   sessionCardId: z.string().min(1, "Session cart id is required"),
   userId: z.string().optional().nullable()
})

export type TCart = z.infer<typeof insertCartSchema>
