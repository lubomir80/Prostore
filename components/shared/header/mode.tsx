"use client"

import { useEffect, useState } from "react"
import { SunIcon, MoonIcon, SunMoon } from "lucide-react"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
   DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"




function ModeToggle() {
   const [mounted, setMounted] = useState(false)
   const { theme, setTheme } = useTheme()

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) {
      return null
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
               variant="ghost">
               {theme === "system" ? (
                  <SunMoon />
               ) : theme === "dark" ? (
                  <MoonIcon />
               ) : <SunIcon />}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
               checked={theme === "system"}
               onClick={() => setTheme("system")}>
               System
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
               checked={theme === "dark"}
               onClick={() => setTheme("dark")}>
               Dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
               checked={theme === "light"}
               onClick={() => setTheme("light")}>
               Light
            </DropdownMenuCheckboxItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default ModeToggle