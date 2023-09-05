import React, { useEffect, useState } from 'react'
import AdminMenu from '../components/AdminMenu';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const DocPage = () => {
  const {id, token, role, appid} = useParams();
  const [datax, setDatax] = useState('');
  const [xae,setXae] = useState(false);
  const [working, setWorking] =useState(false);
  const [work, setWork] =useState(false);
  const appview = async()=>{
    try{

      const {data} = await axios.get('/license/adminview/'+ appid, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      })

      setDatax(data);
      console.log(data);

    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    if(!id){
      return;
    }
    appview();

  },[id])
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <AdminMenu id={id} token={token} role={role} />
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
          <Link to={`/admin/files/pending/${id}/${token}/${role}`} className='mt-8 w-[100px] border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Go Back</Link>
           <div className="flex flex-row m-2 p-2">
            {datax && (
              <>
              <div className="flex flex-col w-1/2 p-1 border-r border-blue-500"><h1 className='mb-2 text-xl font-bold underline'>Teacher Details</h1>
                 <h1>Firstname....: {datax.user_id.firstname}</h1>
                 <h1>lastname....: {datax.user_id.lastname}</h1>
                 <h1>DOB....: {datax.user_id.DOB}</h1>
                 <h1>POB....: {datax.user_id.POB}</h1>
                 <h1>Gender....: {datax.user_id.gender}</h1>
                 <h1>Email....: {datax.user_id.email}</h1>
                 {datax.user_id.certificates.map(doc=>(
                  <>
                  <h1>Qualifications....: {doc}</h1>
                  </>
                 ))}
                 <h1>Experience....: {datax.user_id.experience}</h1>
               </div>
               <div className="flex flex-col w-1/2 p-1"><h1 className='mb-2 text-xl font-bold underline'>Application Details</h1>
                  <h1>License...:{datax.license_type}</h1>
                  <h1>Duration...:{datax.license_duration}</h1>
                  <h1>Subject...:{datax.license_subject}</h1>
                  {working && (
                    <>
                    <h1 className='text-2xl text-red-500 font-bold'>BUTTON NOT WORKING. WAS JUST TO SHOWCASE</h1>
                    </>
                  )}
                  <button onClick={()=>setWorking(true)} className='w-[200px] border border-blue-800 rounder-xl px-2 mb-2 hover:text-white hover:bg-blue-500'>Approve</button>
                  <button onClick={e=>setXae(true)} className='mb-2 w-[200px] border border-blue-800 rounder-xl px-2 hover:text-white hover:bg-blue-500'>Decline</button>
                   {xae && (
                    <>
                    <textarea className='border border-blue-800 rounded-lg' placeholder='Enter the reason why decline application'>

                    </textarea>
                    {work && (
                    <>
                    <h1 className='text-2xl text-yellow-500 font-bold'>BUTTON NOT WORKING. WAS JUST TO SHOWCASE</h1>
                    </>
                  )}
                    <button onClick={()=>setWork(true)} className='w-[200px] border border-blue-800 rounder-xl px-2 mb-2 hover:text-white hover:bg-blue-500'>Submit</button>
                    </>
                   )}
               </div>
              </>
            )}
           </div>
        </div>

    </div>
  )
}

export default DocPage