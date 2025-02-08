import React, { Children } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { IoEllipsisVerticalSharp } from "react-icons/io5";
  import { GoTrash } from "react-icons/go";
  

function DropdownOption({Children, handleOnDelete}) {
  return (
        <DropdownMenu>
            <DropdownMenuTrigger><IoEllipsisVerticalSharp /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleOnDelete}>
                    <div className='flex items-center gap-1 '><GoTrash />Delete</div>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

  )
}

export default DropdownOption