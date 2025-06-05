"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

type HidePassword = {
   hide: boolean,
   setHide: React.Dispatch<React.SetStateAction<boolean>>,
   className?: string,
   tabIndex?: number
}

function ShowPassword({ hide, setHide, className, tabIndex }: HidePassword) {
   return (
      <>
         <Button
            tabIndex={tabIndex}
            onClick={() => setHide(!hide)}
            variant="ghost"
            type="button"
            className={cn(`no-focus absolute right-0 top-[30px] [&_svg]:text-whiteText/30, ${className}`)}>
            {hide ?
               <IoEyeSharp /> :
               <IoEyeOffSharp />}
         </Button>
      </>
   )
}

export default ShowPassword