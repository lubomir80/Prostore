"use client"
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { paymentMethodsSchema, TPaymentMethodsSchema } from "@/schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader } from "lucide-react"
import { updateUserPaymentMethod } from "@/actions/user"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"




function PaymentMethodForm({ preferredPaymentMethod }: { preferredPaymentMethod: string | null }) {
   const router = useRouter()
   const [isPending, startTransition] = useTransition()
   const [message, setMessage] = useState<string | undefined>("")
   const [success, setSuccess] = useState<boolean | undefined>(false)

   const form = useForm<TPaymentMethodsSchema>({
      resolver: zodResolver(paymentMethodsSchema),
      defaultValues: {
         type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD
      }
   })

   const onSubmit = (values: TPaymentMethodsSchema) => {
      setMessage("")
      setSuccess(false)

      startTransition(async () => {
         const res = await updateUserPaymentMethod(values)

         if (!res.success) {
            toast.error(res.message, {
               className: "toast-error"
            })
         }

         router.push("/place-order")
      })
   }



   return (
      <div className="max-w-md mx-auto space-y-4">

         <h1 className="h2-bold nt-4">Payment Method</h1>
         <p className="text-sm text-muted-foreground">
            Please select the payment method
         </p>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6">


               <div className="flex flex-col md:flex-row gap-5">
                  <FormField
                     control={form.control}
                     name="type"
                     render={({ field: { onChange, value } }) => (
                        <FormItem className="space-y-3">
                           <FormControl>
                              <RadioGroup onValueChange={onChange} className="flex flex-col space-y-2">
                                 {PAYMENT_METHODS.map(paymentMethod => (
                                    <FormItem key={paymentMethod} className="flex items-center space-x-3" >
                                       <FormControl>
                                          <RadioGroupItem
                                             value={paymentMethod}
                                             checked={value === paymentMethod} />
                                       </FormControl>
                                       <FormLabel className="font-normal">
                                          {paymentMethod}
                                       </FormLabel>
                                    </FormItem>
                                 ))}
                              </RadioGroup>
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

export default PaymentMethodForm