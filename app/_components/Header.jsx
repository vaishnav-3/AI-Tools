import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
      <Link href={'/'} className="flex gap-2 items-center">
        <Image alt="Logo here"src={'/logo.svg'} width={40} height={20}/>
        <h2 className="font-bold text-2xl">LearnX AI</h2>
        </Link>
        <Link href={'/dashboard'}>
          <Button className='text-white'>Get Started</Button>
        </Link>
    </div>
  )
}

export default Header