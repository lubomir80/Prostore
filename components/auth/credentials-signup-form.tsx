"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpFormSchema, TSignUpFormSchema } from "@/schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { signUpUser } from "@/actions/user"
import { useState, useTransition } from "react"
import ShowPassword from "../show-password"
// import { useSearchParams } from "next/navigation"

function CredentialsSignupForm() {
   const [isPending, startTransition] = useTransition()
   const [message, setMessage] = useState<string | undefined>("")
   const [success, setSuccess] = useState<boolean | undefined>(false)
   const [isShowedPassword, setIsShowedPassword] = useState(false)
   const [isShowedConPassword, setIsShowedConPassword] = useState(false)
   // const searParams = useSearchParams()
   // const callbackUrl = searParams.get("callbackUrl") || "/"



   const form = useForm<TSignUpFormSchema>({
      resolver: zodResolver(SignUpFormSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirmPassword: ""
      }
   })


   const onSubmit = (values: TSignUpFormSchema) => {
      setMessage("")
      setSuccess(false)

      startTransition(() => {
         signUpUser(values, values).then((data) => {
            setSuccess(data?.success)
            setMessage(data?.message)
         })
      })
   }


   const SignUpButton = () => {
      return (
         <Button disabled={isPending} className="w-full" variant="default">
            {isPending ? "Submitting..." : "Sign Up"}
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
                  name="name"
                  render={({ field: { onChange, ...fieldProps } }) => (
                     <FormItem>
                        <FormLabel htmlFor="email">Name</FormLabel>
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
                     <FormItem className="relative">
                        <FormLabel htmlFor="email">Password</FormLabel>
                        <ShowPassword
                           className='top-7 right-3  w-6 h-6'
                           hide={isShowedPassword}
                           setHide={setIsShowedPassword} />
                        <FormControl>
                           <Input
                              className="pr-10"
                              type={isShowedPassword ? "text" : "password"}
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
               <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field: { onChange, ...fieldProps } }) => (
                     <FormItem className="relative">
                        <FormLabel htmlFor="email">Confirm Password</FormLabel>
                        <ShowPassword
                           className='top-7 right-3  w-6 h-6'
                           hide={isShowedConPassword}
                           setHide={setIsShowedConPassword} />
                        <FormControl>
                           <Input
                              className="pr-10"
                              type={isShowedConPassword ? "text" : "password"}
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
               <SignUpButton />
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
               Already have an account?{" "}
               <Link href="/sign-in" target="_self" className="link ">
                  Sign in
               </Link>
            </div>
         </form>
      </Form>
   )
}

export default CredentialsSignupForm