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
            <DropdownMenuContent className="bg-white shadow-md rounded-md">
            <DropdownMenuItem
                onClick={handleOnDelete}
                className="flex items-center gap-2 text-red-600 hover:bg-red-100 cursor-pointer"
              >
                <GoTrash />
                <span>Delete</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

  )
}

export default DropdownOption