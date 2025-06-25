"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { shippingAddressSchema, TShippingAddressSchema } from "@/schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import Link from "next/link"
// import { toast } from "sonner"
// import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader } from "lucide-react"

function ShippingAddressForm({ address }: { address: TShippingAddressSchema }) {
   // const router = useRouter()
   const [isPending, startTransition] = useTransition()
   const [message, setMessage] = useState<string | undefined>("")
   const [success, setSuccess] = useState<boolean | undefined>(false)


   const form = useForm<TShippingAddressSchema>({
      resolver: zodResolver(shippingAddressSchema),
      defaultValues: address
   })

   const onSubmit = (values: TShippingAddressSchema) => {
      setMessage("")
      setSuccess(false)
      console.log(values);

      startTransition(() => {
         // signInCredentials(values, values).then((data) => {
         //    setSuccess(data?.success)
         //    setMessage(data?.message)
         // })
      })
   }



   return (
      <div className="max-w-md mx-auto space-y-4">
         <h1 className="h2-bold nt-4">Shipping Address</h1>
         <p className="text-sm text-muted-foreground">
            Please enter and address to ship to
         </p>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6">
               <div className="space-y-6">
                  <FormField
                     control={form.control}
                     name="fullName"
                     render={({ field: { onChange, ...fieldProps } }) => (
                        <FormItem>
                           <FormLabel htmlFor="fullName">Full name</FormLabel>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="Your full name"
                                 {...fieldProps}
                                 onChange={(e) => {
                                    if (message) setMessage("");
                                    if (success) setSuccess(false);
                                    onChange(e.target.value);
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="streetAddress"
                     render={({ field: { onChange, ...fieldProps } }) => (
                        <FormItem>
                           <FormLabel htmlFor="streetAddress">Address</FormLabel>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="Your address"
                                 {...fieldProps}
                                 onChange={(e) => {
                                    if (message) setMessage("");
                                    if (success) setSuccess(false);
                                    onChange(e.target.value);
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="city"
                     render={({ field: { onChange, ...fieldProps } }) => (
                        <FormItem>
                           <FormLabel htmlFor="city">City</FormLabel>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="Your city"
                                 {...fieldProps}
                                 onChange={(e) => {
                                    if (message) setMessage("");
                                    if (success) setSuccess(false);
                                    onChange(e.target.value);
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="postalCode"
                     render={({ field: { onChange, ...fieldProps } }) => (
                        <FormItem>
                           <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="Your postal code"
                                 {...fieldProps}
                                 onChange={(e) => {
                                    if (message) setMessage("");
                                    if (success) setSuccess(false);
                                    onChange(e.target.value);
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="country"
                     render={({ field: { onChange, ...fieldProps } }) => (
                        <FormItem>
                           <FormLabel htmlFor="country">Country</FormLabel>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="Your country"
                                 {...fieldProps}
                                 onChange={(e) => {
                                    if (message) setMessage("");
                                    if (success) setSuccess(false);
                                    onChange(e.target.value);
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="lat"
                     render={({ field: { onChange, ...fieldProps } }) => (
                        <FormItem>
                           <FormLabel htmlFor="lat">Latitude</FormLabel>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="Your latitude"
                                 {...fieldProps}
                                 onChange={(e) => {
                                    if (message) setMessage("");
                                    if (success) setSuccess(false);
                                    onChange(e.target.value);
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="lng"
                     render={({ field: { onChange, ...fieldProps } }) => (
                        <FormItem>
                           <FormLabel htmlFor="lng">Longitude</FormLabel>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="Your longitude"
                                 {...fieldProps}
                                 onChange={(e) => {
                                    if (message) setMessage("");
                                    if (success) setSuccess(false);
                                    onChange(e.target.value);
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>


               {message && !success && (
                  <div className="text-center text-destructive">
                     {message}
                  </div>
               )}

               {message && success && (
                  <div className="text-center text-green-600">
                     {message}
                  </div>
               )}

               <div>
                  <Button type="submit" disabled={isPending}>
                     {isPending ?
                        (<Loader className="w-4 h-4 animate-spin" />) :
                        (<ArrowRight className="w-4 h-4 " />)}{" "}
                     Continue
                  </Button>
               </div>

            </form>
         </Form>
      </div>
   )
}

export default ShippingAddressForm