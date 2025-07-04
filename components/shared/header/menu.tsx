import { Button } from "@/components/ui/button"
import ModeToggle from "./mode"
import { EllipsisVertical, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import UserButton from "./user-button"


function Menu() {
   return (
      <div className="flex justify-end gap-3">
         <nav className="hidden md:flex w-full max-w-sm gap-1 ">
            <ModeToggle />
            <Button asChild variant="ghost">
               <Link href="/cart" >
                  <ShoppingCart />
                  Cart
               </Link>
            </Button>
            <UserButton />
         </nav>
         <nav className="md:hidden">
            <Sheet>
               <SheetTrigger className="align-middle">
                  <EllipsisVertical />
               </SheetTrigger>
               <SheetContent className="p-5 flex flex-col items-start ">
                  <SheetTitle>Menu</SheetTitle>
                  <ModeToggle />
                  <Button asChild variant="ghost">
                     <Link href="/cart" >
                        <ShoppingCart />
                        Cart
                     </Link>
                  </Button>
                  <UserButton />
               </SheetContent>
            </Sheet>
         </nav>
      </div>
   )
}

export default Menu