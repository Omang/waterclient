import React, {useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaReadme, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../../NotificationContext';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import Menu from './Menu'


const MainPermit = () => {
  
  const {user}= useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);
  return (
    <div className='flex flex-row md:px-2 mt-4'>
    <div className='md:block hidden'>

        <div className='flex flex-row'>
 
            <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
            
             <Menu  />
            </div>

            <div className=' flex flex-row md:w-[780px] md:h-[440px] p-2'>
            </div>
        </div>
    </div>
</div>
  )
}

export default MainPermit