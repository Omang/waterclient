import React, { useContext, useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import { UserContext } from '../../UserContext';
import axios from 'axios'
import { GridLoader } from 'react-spinners';
import NotificationContext from '../../NotificationContext';
import { Link, useParams } from 'react-router-dom';


const UserPage = () => {
      
  const {user}= useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [opt, setOpt] = useState('');
  const [appuser, setAppuser] = useState([]);
  const {id} = useParams();

  const gettheuser = async()=>{
    try{

        setLoading(true);

        const {data} = await axios.post('/admin/appuser',{
            appuser_id: id
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.refreshToken}` 
            }
          });
         setLoading(false);
         setAppuser(data);


    }catch(e){setLoading(false);
        console.log(e);
    }
  }

  useEffect(()=>{
    if(!id){
        return;
    }
    gettheuser();

  },[id])

  return (
    <div className='flex flex-row md:px-2 mt-4'>
       <div className='md:block hidden'>

              <div className='flex flex-row'>
 
                    <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
                       <AdminMenu  />
                    </div>

                    <div className=' flex flex-row md:w-[780px] md:h-[440px] p-2'>
                        <div className="w-1/2 m-2 p-3 flex flex-col items-center">
                            <h1 className='text-red-400 font-semibold'>Personal details</h1>
                            {appuser && (
                                <div className='bg-gray-200 rounded-lg border flex flex-col border-gray-900'>

                                <h1 className='border-b border-gray-800'>
                                Firstname: {appuser.firstname}
                                </h1>
                                 <h1 className='border-b border-gray-800'>Lastname: {appuser.lastname}</h1>
                                 <h1 className='border-b border-gray-800'>Role: {appuser.role}</h1>
                                 <h1 className='border-b border-gray-800'>Mobile contact: {appuser.mobilenumber}</h1>
                                 <h1 className='border-b border-gray-800'>Email: {appuser.email}</h1>
                                 <div className='flex flex-row  items-center justify-between'>
                                    <button className='border-blue-700 rounded-md border hover:bg-blue-500'>Update</button>
                                    <button className='border-blue-700 rounded-md border hover:bg-blue-500'>Delete</button>
                                    <button className='border-blue-700 rounded-md border hover:bg-blue-500'>Block</button>
                                 </div>
                                </div>
                            )}
                        </div>
                        <div className="w-1/2 m-2 p-3 flex flex-col">
                            <h1 className='text-red-400 font-semibold'>The work</h1>
                        </div>
                    </div>
                </div>
        </div>
    </div>
            
  )
}

export default UserPage