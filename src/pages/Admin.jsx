import React, {useState, useEffect, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaWhmcs, FaFileArchive, FaRegChartBar, FaAddressBook} from "react-icons/fa";
import AdminMenu from '../components/AdminMenu';
import axios from 'axios';
import { UserContext } from '../UserContext';

const Admin = () => {
  //const {id, token, role} = useParams();
  const [datax, setDatax] = useState('');
  const {setUser, setReady} = useContext(UserContext);
  //console.log(token);
  const getuser = async()=>{
    try{
      const {data} = await axios.get('/user/getuser/'+id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      setDatax(data);
      
    }catch(e){
      console.log(e);
    }
  }
  /*
  useEffect(()=>{
     if(!id){
      return;
     }
     getuser();
  },[id]);
  */
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
            <AdminMenu />
           </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           <div className='flex h-1/2 flex-row gap-4'>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaAddressBook/>
            <div className="flex flex-col m-2">
              {datax && (<>
                 <h1 className='font-semibold text-xl underline'> Names: {datax.firstname} {datax.lastname}</h1>
                 <p className='font-semibold text-sm'>Born: {datax.DOB}</p>
                 <p className='font-semibold text-sm'> Born At: {datax.POB}</p>
                 <p className='font-semibold text-sm'> Gender: {datax.gender}</p>
                 
              </>)}
              {datax.certificates && (
              <>
              {datax.certificates.map(doc=>(
                <p key={doc} className='font-semibold text-sm'>{doc} </p>
              ))}
             {datax && (<>
              <p className='font-semibold text-sm'> Qualification: {datax.experience}</p>
             </>)}
              </>
            )}
            </div>
            </div>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaRegChartBar /></div>
           </div>
           <div className='flex h-1/2 flex-row gap-4'>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaFileArchive/></div>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaWhmcs/></div>
           </div>
        </div>

    </div>
  )
}

export default Admin