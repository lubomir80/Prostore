import { auth } from "@/auth"
import CredentialsSigninForm from "@/components/auth/credentials-signin-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { APP_NAME } from "@/lib/constants"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
   title: "Sign in"
}

async function SignInPage(props: {
   searchParams: Promise<{
      callbackUrl: string
   }>
}) {
   const { callbackUrl } = await props.searchParams

   const session = await auth()

   if (session) {
      redirect(callbackUrl || "/")
   }

   return (
      <div className="w-full max-w-md mx-auto">
         <Card>
            <CardHeader className="space-y-4">
               <Link href="/" className="flex-center">
                  <Image
                     src="/images/logo.svg"
                     width={100}
                     height={100}
                     alt={`${APP_NAME} logo`}
                     priority={true} />
               </Link>
            </CardHeader>
            <CardTitle className="text-center">
               Sign in
            </CardTitle>
            <CardDescription className="text-center">
               Sign in to your account
            </CardDescription>
            <CardContent className="space-y-4">
               <CredentialsSigninForm />
            </CardContent>
         </Card>
      </div>
   )
}

export default SignInPage