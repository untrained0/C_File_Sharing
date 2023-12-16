import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader() {
  return (
    <div className='border-b flex p-5 items-center justify-between md:justify-end'>
        <AlignJustify className='md:hidden'/>
        <Image src='/logo.svg' width={60} height={150} className='md:hidden'/>
        <UserButton />
    </div>
  )
}

export default TopHeader
