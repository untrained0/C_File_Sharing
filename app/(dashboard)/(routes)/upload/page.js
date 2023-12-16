"use client"
import React from 'react'
import UploadForm from './_components/UploadForm'

function Upload() {
  return (
    <div className='p-5 md:px-28'>
      <h2 className='text-[20px] text-center m-5' ><strong className='text-PRIMARY'>Upload </strong>
       files and <strong className='text-PRIMARY'>Share </strong>it</h2>
      <UploadForm />
    </div>
  )
}

export default Upload
