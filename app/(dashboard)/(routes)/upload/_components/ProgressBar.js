import React from 'react'

function ProgressBar({progress}) {
  return (
    <div className='mt-3 rounded-full bg-gray-400 w-full '>
      <div className=' bg-PRIMARY h-4
       rounded-full text-[12px]'
       style={{width:`${progress}%`}}>
        {`${Number(progress).toFixed(0)}%`}
      </div>
    </div>
  )
}

export default ProgressBar
