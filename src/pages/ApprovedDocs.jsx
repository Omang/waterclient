import React, {useState, useEffect, useContext} from 'react'
import AdminMenu from '../components/AdminMenu'
import FilesMenu from '../components/FilesMenu'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'

const ApprovedDocs = () => {
  const {id, token, role} = useParams();
  const [datx, setDatx] = useState([]);
  const getApproved = async()=>{
    try{

      const {data} = await axios.post('/license/getapproved',{id:id});

      setDatx(data);

    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    if(!id){
      return;
    }
    getApproved();
  },[id])

  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <AdminMenu id={id} token={token} role={role} />
          
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           <FilesMenu id={id} token={token} role={role} />
           {datx ? <>
              <div className="flex flex col m-4 border rounded-sm p-2">
                    {datx.map(doc=>(<>
                       <div className="border flex flex-row gap-5 border-blue-500 rounded-xs">
                       <h1>Lastname: {doc.user_id.lastname}</h1>
                       <h1>License: {doc.license_type}</h1>
                       <h1>Subject: {doc.license_subject}</h1>
                       <h1 className='bg-blue-500 text-white cursor-pointer'>View more</h1>
                       </div>
                    </>))}
              </div>
           </> : 'No Approved Application'}
        </div>

    </div>
  )
}

export default ApprovedDocs