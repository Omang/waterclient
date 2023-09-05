import React from 'react'
import AdminMenu from './AdminMenu'
import { Link, useParams } from 'react-router-dom'
import FilesMenu from './FilesMenu'

const Files = () => {
  const {id, token, role} = useParams();
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <AdminMenu id={id} token={token} role={role} />
          
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           <FilesMenu id={id} token={token} role={role} />
           <div className='m-4'>
              <h1 className="text-3xl font-bold text-red-500">
                Use the above menu!
              </h1>
           </div>
        </div>

    </div>
  )
}

export default Files