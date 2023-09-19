import React, {useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaReadme, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../../NotificationContext';
import { UserContext } from '../../UserContext';
import axios from 'axios';

const InspectorMenu = () => {
    const {notificationHandler} = useContext(NotificationContext);
    const {setUser, setReady} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    const logout = async()=>{
      //console.log('working')
      try{
        console.log('working');
        notificationHandler({type:'warning', message:'Logout success Next time'});
        setUser(null);
        setReady(false);  
        setRedirect('/');
          
  
      }catch(e){
        console.log(e);
      }
  }
  if(redirect){
    return <Navigate to={redirect} />
  }
  return (
    <>

<Link to={`/inspector`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><h1>
            Home</h1></Link>
            <button onClick={logout} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center' >Logout</button>
        

    </>
  )
}

export default InspectorMenu