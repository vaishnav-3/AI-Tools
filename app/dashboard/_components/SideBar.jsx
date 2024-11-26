"use client"
import React from 'react'
import Dashboard from '../page';
import { LayoutDashboard, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';


function SideBar() {

    const MenuList = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            name: 'Profile',
            icon: UserCircle,
            path: '/dashboard/profile'
        }
    ]

    const path = usePathname();

  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center">
        <img src="/logo.svg" alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">Ai LMS</h2>
      </div>
      <div className="mt-10">
        <button className="btn btn-outline-primary w-full">+ Create New</button>
        <div className='mt-5'>
          {MenuList.map((menu, index) => (
            <div key={index} className={`flex gap-5 items-center p-3 hover:bg-gray-300 rounded-lg cursor-pointer mt-3 ${path==menu.path&&'bg-gray-300'}`}>
              <menu.icon />
              <h2>{menu.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar