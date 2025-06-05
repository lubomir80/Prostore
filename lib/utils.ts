import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}


export function convertToPlainObject<T>(value: T): T {
   return JSON.parse(JSON.stringify(value))
}
export function formatNumberWithDecimal(num: number): string {
   const [int, dec] = num.toString().split(".")
   return dec ? `${int}.${dec.padEnd(2, "0")}` : `${int}.00`
}

//Format errors
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
   if (error.name === "ZodError") {
      //Zod error
      const fieldErrors = Object.keys(error.errors)
         .map(field => error.errors[field])

      return fieldErrors.join(". ")
   } else if (
      error.name === "PrismaClientKnownRequestError" &&
      error.code === "P2002"
   ) {
      // Prisma error
      const field = error.meta?.target ? error.meta.target[0] : "Field"
      return `${field.chatAt(0).toUpperCase() + field.slice(1)} already exist`
   } else {
      //other
      return typeof error.message === "string" ? error.message : JSON.stringify(error.message)
   }
}