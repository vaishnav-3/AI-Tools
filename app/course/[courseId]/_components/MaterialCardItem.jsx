import React from 'react'

function MaterialCardItem({item}) {
  return (
    <div className='border shadow-md rounded-lg bg-gray-100 p-5 flex flex-col items-center justify-between'>
        <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</h2>
        <img src={item.icon} alt={item.name} width={50} height={50} />
        <h2 className='font-medium mt-3'>{item.name}</h2>
        <h2 className='text-gray-500 text-sm text-center'>{item.desc}</h2>
        <button className='btn btn-block btn-outline-primary mt-3 hover:cursor-pointer'>View</button>
    </div>
  )
}

export default MaterialCardItem