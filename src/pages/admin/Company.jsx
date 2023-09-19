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
    const [companyx, setCompanyx] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [opt, setOpt] = useState('');
    const [appuser, setAppuser] = useState([]);
    const {id} = useParams();


    const getapproved = async(theid)=>{
        try{

            const {data} = await axios.post('/admin/appaproved',{
                auth_id: theid
            })

            if(!data.message){
                setCompanyx(data);
            }else{
                console.log('no data');
            }

        }catch(e){
            console.log(e);
        }
    }

    const getcompany = async()=>{
        try{
        setLoading(true);
        const {data} = await axios.post('/admin/singlecompany',{
            company_id: id
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.refreshToken}` 
            }
          })

          
          setCompany(data);
          getapproved(data.auth_id);
          setLoading(false);
        

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
                        {
      loading ?
      <div className=" justify-center  text-center">
      <GridLoader color={'#7ED321'} loading={loading} size={20} />
      </div>
      : <>
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
      </>}
                               
                            

                        </div>
                        <div className='w-1/2'>
                            <h1>Certificate</h1>
                            {companyx && (
                                <>
                                <div className='mx-4 w-[300px] flex flex-col border roundend-sm border-blue-500'>
                                <label className='font-bold text-red-500 underline'>Certificate Name</label>
                                 <h1 className='font-bold mb-2'>{companyx.application_type}</h1>
                                 <label className='font-bold text-red-500 underline'>Approved By..</label>
                                 <h1 className='font-bold mb-2'>{companyx.application_approveby.firstname} {companyx.application_approveby.lastname}</h1>
                                  <p>{companyx.application_approveby.email}</p>
                                </div>
                                </>
                            )}

                        </div>
                     </div>
                </div>
        </div>

    </div>
  )
}

export default Company