"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInFormSchema, TSignInFormSchema } from "@/schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { signInCredentials } from "@/actions/user"
import { useState, useTransition } from "react"
// import { useSearchParams } from "next/navigation"





function CredentialsSigninForm() {
   const [isPending, startTransition] = useTransition()
   const [message, setMessage] = useState<string | undefined>("")
   const [success, setSuccess] = useState<boolean | undefined>(false)
   // const searParams = useSearchParams()
   // const callbackUrl = searParams.get("callbackUrl") || "/"



   const form = useForm<TSignInFormSchema>({
      resolver: zodResolver(SignInFormSchema),
      defaultValues: {
         email: "",
         password: "",
      }
   })


   const onSubmit = (values: TSignInFormSchema) => {
      setMessage("")
      setSuccess(false)

      startTransition(() => {
         signInCredentials(values, values).then((data) => {
            setSuccess(data?.success)
            setMessage(data?.message)
         })
      })
   }


   const SignInButton = () => {
      return (
         <Button disabled={isPending} className="w-full" variant="default">
            {isPending ? "Signing in..." : "Sign in"}
         </Button>
      )
   }


   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
            <div className="space-y-6">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field: { onChange, ...fieldProps } }) => (
                     <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                           <Input
                              type="text"
                              autoComplete="email"
                              placeholder="Your email"
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
                  name="password"
                  render={({ field: { onChange, ...fieldProps } }) => (
                     <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                           <Input
                              type="password"
                              autoComplete="password"
                              placeholder="*********"
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
            <div>
               <SignInButton />
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

            <div className="text-sm text-center text-muted-foreground">
               Don&apos;t have an account?{" "}
               <Link href="/sign-uo" target="_self" className="link ">
                  Sign up
               </Link>
            </div>
         </form>
      </Form>
   )
}

export default CredentialsSigninForm