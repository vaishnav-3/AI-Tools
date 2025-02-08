"use client"
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function DashboardHeader() {
  const pathname = usePathname();
  const isDashboardPath = pathname === "/dashboard";

  return (
    <div className={`p-5 shadow-md flex items-center ${isDashboardPath ? "justify-end" : "justify-between"}`}>
      {!isDashboardPath && (
        <Link href="/dashboard" className="flex gap-2 items-center">
          <img src="/logo.svg" alt="logo" width={40} height={40} />
          <h2 className="font-bold text-2xl">LearnX AI</h2>
        </Link>
      )}
      <UserButton />
    </div>
  );
}


export default DashboardHeader