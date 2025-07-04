import * as z from "zod"
import { Decimal } from "@prisma/client/runtime/library";
// import { formatNumberWithDecimal } from "./utils"

// const currency = z
//    .string()
//    .refine(
//       (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
//       "Price must have exactly two decimal places"
//    );


export const insertProductSchema = z.object({
   name: z.string().min(3, "Name must be at least 3 char."),
   slug: z.string().min(3, "Slug must be at least 3 char."),
   category: z.string().min(3, "Category must be at least 3 char."),
   brand: z.string().min(3, "Brand must be at least 3 char."),
   description: z.string().min(3, "Description must be at least 3 char."),
   stock: z.coerce.number(),
   images: z.array(z.string()).min(1, "Product must have at least one image"),
   isFeatured: z.boolean(),
   banner: z.string().nullable(),
   price: z.union([z.string(), z.number()]).transform(val => new Decimal(val)),
   rating: z.union([z.string(), z.number()]).transform(val => new Decimal(val))
})


export const signInFormSchema = z.object({
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must be at lease 6 characters")
})

export type TSignInFormSchema = z.infer<typeof signInFormSchema>

