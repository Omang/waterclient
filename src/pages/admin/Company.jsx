import React, { useContext, useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import { UserContext } from '../../UserContext';
import axios from 'axios'
import { GridLoader } from 'react-spinners';
import NotificationContext from '../../NotificationContext';
import { Link, useParams } from 'react-router-dom';

const Company = () => {
    const {user}= useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);
    const [company, setCompany] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [opt, setOpt] = useState('');
    const [appuser, setAppuser] = useState([]);
    const {id} = useParams();

    const getcompany = async()=>{
        try{

        const {data} = await axios.post('/admin/singlecompany',{
            company_id: id
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.refreshToken}` 
            }
          })

          setLoading(false);
          setCompany(data);

        }catch(e){
            setLoading(false);
            console.log(e);
        }
    }

    useEffect(()=>{
        if(!id){
            return;
        }
        getcompany();
    },[id])
  

  return (
    <div className='flex flex-row md:px-2 mt-4'>
        <div className='md:block hidden'>

                <div className='flex flex-row'>
 
                     <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
                        <AdminMenu  />
                     </div>

                     <div className=' flex flex-row gap-4 md:w-[780px] md:h-[440px] p-2 mr-4'>
                        <div className='w-1/2 border-dashed border-blue-500 border-r'>
                            
                               {company &&(
                                <><div className='mx-4 w-[400px] flex flex-col'>
                                <label className='font-bold text-black'>Company Name</label>
                                <h1 className='text-gray-500 text-lg'>{company.company_name}</h1>
                                <label className='font-bold text-black'>Company CIPA</label>
                                <h1 className='text-gray-500 text-lg'>{company.company_cipa}</h1>
                                <label className='font-bold text-black'>Company Ownership</label>
                                <h1 className='text-gray-500 text-lg'>{company.company_ownership}</h1>
                                <label className='font-bold text-black'>Company Directors</label>
                                {company.company_directors && company.company_directors.map(director=>(
                                    <div key={director._id} className='flex flex-col '>
                                       <h1 className='text-gray-700 text-lg'>Fullname: {director.fullname}</h1>
                                       <h1 className='text-gray-700 text-lg'>Nationality: {director.nationality}</h1>
                                       <h1 className='text-gray-700 text-lg'>Shares: {director.percent_own}</h1>
                                    </div>
                                ))}
                                <label className='font-bold text-black'>Company Physical Address</label>
                                <h1 className='text-gray-500 text-lg'>{company.company_address.physical_address}</h1>
                                <label className='font-bold text-black'>Company Postal Address</label>
                                <h1 className='text-gray-500 text-lg'>{company.company_address.postal_address}</h1>
                                </div></>
                               )}
                            

                        </div>
                        <div className='w-1/2'>
                            <h1>Applications and Cerficates</h1>

                        </div>
                     </div>
                </div>
        </div>

    </div>
  )
}

export default Company