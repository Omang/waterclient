import React from 'react'
import TeacherMenu from './TeacherMenu'
import { useParams } from 'react-router-dom'

const Ranks = () => {
  const {id, token, role} = useParams();
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
        <TeacherMenu token={token} id={id} role={role} />
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           Ranks
        </div>

    </div>
  )
}

export default Ranks