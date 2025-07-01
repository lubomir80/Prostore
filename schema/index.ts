import { PAYMENT_METHODS } from "@/lib/constants"
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


export const shippingAddressSchema = z.object({
   fullName: z.string().min(3, "Name must be at least 3 characters"),
   streetAddress: z.string().min(3, "Address must be at least 3 characters"),
   city: z.string().min(3, "City must be at least 3 characters"),
   postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
   country: z.string().min(3, "Country must be at least 3 characters"),
   lat: z.number().optional(),
   lng: z.number().optional(),
})

export type TShippingAddressSchema = z.infer<typeof shippingAddressSchema>


export const paymentMethodsSchema = z.object({
   type: z.string().min(1, "Payment method is required")
}).refine((data) => PAYMENT_METHODS.includes(data.type), {
   path: ["type"],
   message: "Invalid payment method"
})

export type TPaymentMethodsSchema = z.infer<typeof paymentMethodsSchema>


export const insertOrderSchema = z.object({
   userId: z.string().min(1, 'User is required'),
   itemsPrice: currency,
   shippingPrice: currency,
   taxPrice: currency,
   totalPrice: currency,
   paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
      message: 'Invalid payment method',
   }),
   shippingAddress: shippingAddressSchema,
});




export const insertOrderItemSchema = z.object({
   productId: z.string(),
   slug: z.string(),
   image: z.string(),
   name: z.string(),
   price: currency,
   qty: z.number(),

});

export type TInsertOrderItemSchema = z.infer<typeof insertOrderItemSchema>

export type TInsertOrderSchema = z.infer<typeof insertOrderSchema> & {
   id: string;
   createdAt: Date;
   isPaid: Boolean;
   paidAt: Date | null;
   isDelivered: Boolean;
   deliveredAt: Date | null;
   orderitems: TInsertOrderItemSchema[];
   user: { name: string; email: string }
}