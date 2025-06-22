import { z } from "zod"
import { insertProductSchema } from "@/lib/validation"
import { TCartItem } from "@/schema";

export type Product = z.infer<typeof insertProductSchema> & {
   id: string,
   createdAt: Date,
}


export type Cart = {
   items: TCartItem[];
   itemsPrice: string;
   totalPrice: string;
   shippingPrice: string;
   taxPrice: string;
   id: string;
   createdAt: Date;
   userId: string | null;
   sessionCardId: string;
}