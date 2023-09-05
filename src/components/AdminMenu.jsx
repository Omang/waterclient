import React, {useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../NotificationContext';
import { UserContext } from '../UserContext';
import axios from 'axios';

const AdminMenu = () => {
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
    <Link to={`/admin`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaAddressBook/><h1>
            Home</h1></Link>
           <Link to={`/admin/files`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaFileArchive />
           <h1>Codes Management</h1></Link>
           <Link to={`/admin/analytics`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaRegChartBar/>
           <h1>Analytics & Reports</h1></Link>
           <Link to={`/admin/officers`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaUsers/>
           <h1>Users Management</h1></Link>
           <Link to={`/admin/contractors`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaTh/>
           <h1>Contractors Management</h1></Link>
           <button onClick={logout}  className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaPowerOff/><h1>Logout</h1></button>
        
    </>
  )
}

export default AdminMenu