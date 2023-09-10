import React, { useContext, useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import { UserContext } from '../../UserContext';
import axios from 'axios'
import { GridLoader } from 'react-spinners';
import NotificationContext from '../../NotificationContext';
import { Link, useParams } from 'react-router-dom';
import Table from '../../components/Table';

const Contractors = () => {
  const {user}= useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  const [companies, setCompanies] = useState([]);
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [emailcheck, setEmailcheck] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [opt, setOpt] = useState('');
  const [appusers, setAppusers] = useState([]);

  const getcompanies = async()=>{
    try{
        setLoading(true);
      const {data} = await axios.post('admin/allcompanies',{
        auth_id: user._id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.refreshToken}` 
        }
      })
      setLoading(false);
      setCompanies(data);

    }catch(e){
      setLoading(false);
      console.log(e);
    }
  }
  useEffect(()=>{
    getcompanies();
  },[])

  return (
    <div className='flex flex-row md:px-2 mt-4'>
        <div className='md:block hidden'>
    
            <div className='flex flex-row'>
     
                <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
                   <AdminMenu  />
                </div>

                <div className=' flex flex-row md:w-[780px] md:h-[440px] p-2'>
                    <div className='px-6'>
                    <div>
     {
      loading ?
      <div className=" justify-center  text-center">
      <GridLoader color={'#7ED321'} loading={loading} size={20} />
      </div>
      :
     <div >
       {companies.length !== 0 && (
        <Table datax={companies} />
       )}
     </div>
     }
     </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Contractors