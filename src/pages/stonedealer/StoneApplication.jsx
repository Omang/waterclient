import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaReadme, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../../NotificationContext';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import Menu from './Menu'
import { GridLoader } from 'react-spinners';

const StoneApplication = () => {
  const {user}= useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  const {id} = useParams();
  const [loading, setLoading]= useState(false);
  const [loadingx, setLoadingx] = useState(false);
  const [returnloadingx, setReturnloadingx] = useState(false);
  const [returnsms, setReturnsms] = useState('');
  const [returnhead, setReturnhead]= useState('');
  const [appdata, setAppdata]=useState('');
  const [verifyon, setVerifyon] = useState(false);

  const applicationreturn =async()=>{

  }
  const applicationverify = async(ev, appdata)=>{
      ev.preventDefault();
    const app_id = appdata.applicationdetails._id;
    const auth_id = appdata.companydetails.auth_id;
    
    try{

      setLoadingx(true);
      setVerifyon(true);
      const {data} = await axios.put('/app/verifyapp', {
        app_id: app_id,
        auth_id: auth_id
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.refreshToken}` 
        }
      })

      setLoadingx(false);
      setVerifyon(true);
     
    }catch(e){
      setLoadingx(false);
      setVerifyon(false);
      console.log(e);
    }
      
  }
  const getapplication = async()=>{

    try{
       setLoading(true);
      const {data}= await axios.post('/app/officergetapp',{
        app_id: id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.refreshToken}` 
        }
      })
      setLoading(false);
      setAppdata(data);
      console.log(data);

    }catch(e){
      setLoading(false);
      console.log(e);
    }

  }
  useEffect(()=>{
    getapplication();
  },[])
  
  
return (
  <div className='flex flex-row md:px-2 mt-4'>
  <div className='md:block hidden'>

      <div className='flex flex-row'>

          <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          
            <Menu  />
          </div>

          <div className='md:w-[780px] md:h-[440px] p-2'>
             
          {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : 
          <div className='flex flex-row gap-2'>

<div className='w-1/2'>
              {appdata.companydetails && (
                <div className='flex flex-col border border-blue-500 p-4'>
                  <h1 className='text-xl text-red-500 underline mb-2'>Company Details</h1> 
                  <div className='mx-4 w-[400px] flex flex-col'>
                                <label className='font-bold text-black'>Company Name</label>
                                <h1 className='text-gray-500 text-lg'>{appdata.companydetails.company_name}</h1>
                                <label className='font-bold text-black'>Company CIPA</label>
                                <h1 className='text-gray-500 text-lg'>{appdata.companydetails.company_cipa}</h1>
                                <label className='font-bold text-black'>Company Ownership</label>
                                <h1 className='text-gray-500 text-lg'>{appdata.companydetails.company_ownership}</h1>
                                <label className='font-bold text-black'>Company Directors</label>
                                {appdata.companydetails.company_directors && appdata.companydetails.company_directors.map(director=>(
                                    <div key={director._id} className='flex flex-col '>
                                       <h1 className='text-gray-700 text-lg'>Fullname: {director.fullname}</h1>
                                       <h1 className='text-gray-700 text-lg'>Nationality: {director.nationality}</h1>
                                       <h1 className='text-gray-700 text-lg'>Shares: {director.percent_own}</h1>
                                    </div>
                                ))}
                                <label className='font-bold text-black'>Company Physical Address</label>
                                <h1 className='text-gray-500 text-lg'>{appdata.companydetails.company_address.physical_address}</h1>
                                <label className='font-bold text-black'>Company Postal Address</label>
                                <h1 className='text-gray-500 text-lg'>{appdata.companydetails.company_address.postal_address}</h1>
                                </div>
                </div>
              )}
           </div>
           <div className='w-1/2'>
           {appdata.applicationdetails && (
                <div className='flex flex-col h-[500px] border border-blue-500 p-4'>
                  <h1 className='text-xl text-red-500 underline mb-2'>Application Details</h1>
                   <p className='text-md text-black'>Application for...: {appdata.applicationdetails.application_type}</p>
                   <p className='text-md text-black mb-4'>Application on...: {appdata.applicationdetails.createdAt}</p> 
                   {appdata.applicationdetails.application_attachment && appdata.applicationdetails.application_attachment.map(item=>(
                    <div key={item} className='w-[300px] h-[150px]'>
                      <img src={`http://localhost:3000/uploads/${item}`} />
                    </div>
                   ))} 
                   
                   {!appdata.applicationdetails.application_pending ? <>

                    <div className='flex flex-row  justify-between mt-32'>
                       <p className='px-2 rounded-2xl border bg-blue-500 text-white'>Verified OK</p>
                       <Link to={'/officer/stonesapps'}  className='px-2 rounded-2xl border bg-blue-500 text-white hover:bg-red-500'>BackTomain</Link>
                   </div>

                   </> : <>

                   <div className='flex flex-row  justify-between mt-32'>

                   {loadingx ? <GridLoader color={'#7ED321'} loading={loadingx} size={5} /> : <>

                   {!verifyon ? <>
                        <button onClick={(ev)=>applicationverify(ev, appdata)} className='px-2 rounded-2xl border bg-blue-500 text-white hover:bg-red-500'>VerifyDoc</button>
                       <button className='px-2 rounded-2xl border bg-blue-500 text-white hover:bg-red-500'>ReturnDoc</button>
                       
                       </>: <>

                       <p className='px-2 rounded-2xl border bg-blue-500 text-white'>Verified OK</p>
                       
                       </>}
                   
                   </>}
                       
                       
                       <Link to={'/officer/stonesapps'}  className='px-2 rounded-2xl border bg-blue-500 text-white hover:bg-red-500'>BackTomain</Link>
                   </div>
                   
                   </>}

                </div>
                
              )}
           </div>

            </div>}

          </div>
      </div>
  </div>
</div>
)
}

export default StoneApplication