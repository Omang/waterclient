import React, {useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../NotificationContext';
import { UserContext } from '../UserContext';
import axios from 'axios';

const FilesMenu = () => {
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
    <div className='flex flex-row mt-1 justify-center items-center gap-4'>
    <Link to={`/admin/files/pending`} className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Home</Link>
              <Link to={`/admin/files/pending`} className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Applications</Link>
              <Link to={`/admin/files/approve`} className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Messages</Link> 
              <button onClick={logout}  className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaPowerOff/><h1>Logout</h1></button>
           </div>
    </>
  )
}

export default FilesMenu