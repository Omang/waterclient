import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaReadme, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../../NotificationContext';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import Menu from './Menu'
import { GridLoader } from 'react-spinners';


const MainStone = () => {

  const {user}= useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState([]);

  

  return (
    <div className='flex flex-row md:px-2 mt-4'>
    <div className='md:block hidden'>

        <div className='flex flex-row'>
 
            <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
               <Menu  />
            </div>

            <div className=' md:w-[780px] md:h-[440px] p-2'>
            {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : 
            <div className='flex flex-row gap-3'>
              <div className='w-1/2 flex flex-col'>
                  <h1 className='font-semibold text-red-500'>Officer Details</h1>
                  
                </div>
                <div className='w-1/2 flex flex-col'>
                  <div className='my-4'>
                  <h1 className='font-semibold text-red-500'>Sms</h1>

                  </div>
                  <div className='my-4'>
                  <h1 className='font-semibold text-red-500'>Notice board</h1>

                  </div>
            
                </div>
              
              
              </div>}
                
            </div>
        </div>
    </div>
</div>
  )
}

export default MainStone