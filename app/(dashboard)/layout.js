import React from 'react'
import SideBarNav from './_components/SideBarNav'
import TopHeader from './_components/TopHeader'

function layout({children}) {
  return (
    <div>
      <div className=' h-full w-64 fixed z-50 inset-y-0 flex-col
      md:flex hidden '>
        <SideBarNav />
      </div>
      <div className='md:ml-64'>
        <TopHeader />
      {children}
      </div>
      
    </div>
  )
}

export default layout
