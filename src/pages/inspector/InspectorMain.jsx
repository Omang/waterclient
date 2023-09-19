import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaReadme, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../../NotificationContext';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import InspectorMenu from './InspectorMenu'
import InspectorTable from '../../components/InspectorTable';

const InspectorMain = () => {
    const {user}= useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const [apps, setApps] = useState([]);

    const getallcompanies = async()=>{
        try{
            setLoading(true)
            const {data} = await axios.post('/contractor/allcompanies', {
                user_id: user._id
            })
            setLoading(false);
            setApps(data);

        }catch(e){
            
            setLoading(false);
            console.log(e);
        }
    }

    useEffect(()=>{
        getallcompanies();
    },[])
    
  return (
    <>

<div className='flex flex-row md:px-2 mt-4'>
  <div className='md:block hidden'>

      <div className='flex flex-row'>

          <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          
            <InspectorMenu  />
          </div>

          <div className=' justify-center items-center md:w-[780px] md:h-[440px] p-2'>
            {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <>
              
              <InspectorTable datax={apps} />
            </>}
          </div>
      </div>
    </div>

    </div>
    
    </>
  )
}

export default InspectorMain