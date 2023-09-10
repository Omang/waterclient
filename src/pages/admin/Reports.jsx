import React from 'react'
import AdminMenu from '../../components/AdminMenu'

const Reports = () => {
  return (
    <div className='flex flex-row md:px-2 mt-4'>
    <div className='md:block hidden'>

        <div className='flex flex-row'>
 
            <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
               <AdminMenu  />
            </div>

            <div className=' flex flex-row md:w-[780px] md:h-[440px] p-2'>
                reports and analytics here
            </div>
        </div>
    </div>
</div>
  )
}

export default Reports