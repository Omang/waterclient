import React from 'react'
import AdminMenu from './AdminMenu'
import { useParams } from 'react-router-dom';

const Analytics = () => {
  const {id, token, role} = useParams();
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <AdminMenu id={id} token={token} role={role} />
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           Analytics
        </div>

    </div>
  )
}

export default Analytics