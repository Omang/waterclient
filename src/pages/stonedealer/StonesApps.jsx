import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaReadme, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../../NotificationContext';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import Menu from './Menu'
import { GridLoader } from 'react-spinners';

const StonesApps = () => {
  const {user}= useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState([]);


  const getapps = async()=>{
    try{
      setLoading(true);
       const {data} = await axios.post('/app/allapps',{
        application_type: 'PSDL'
       });
       setLoading(false);
       setApps(data);
       //console.log(data);

    }catch(e){
      setLoading(false);
      console.log(e);
    }
  }

  useEffect(()=>{
    getapps();
  },[])

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
                  <h1 className='font-semibold text-red-500'>New Applications</h1>
                  <table className="table-auto border border-blue-500 rounded-lg">
  <thead>
    <tr className='border border-blue-500 bg-gray-400'>
      <th className='mx-4 px-2'>Application Type</th>
      <th className='mx-4 px-2'>Created On</th>
      <th className='mx-4 px-2'>Manage</th>
    </tr>
  </thead>
  <tbody>
    {apps && apps.map(app=>(
    <>
    {app.application_pending && (
      <tr className='hover:bg-blue-300' key={app._id}>
      <td>{app.application_type}</td>
      <td>{app.createdAt}</td>
      <td className='hover:text-white hover:bg-red-500'><Link to={`/officer/stoneapp/${app._id}`}>Manage</Link></td>
     </tr>
    )}
    </>
    ))}

  </tbody>
</table>
                  
                </div>
                <div className='w-1/2 flex flex-col'>
                  <div className='my-4'>
                  <h1 className='font-semibold text-red-500'>Waiting Approval</h1>

                  <table className="table-auto border border-blue-500 rounded-lg">
  <thead>
    <tr className='border border-blue-500 bg-gray-400'>
      <th className='mx-4 px-2'>Application Type</th>
      <th className='mx-4 px-2'>Created On</th>
      <th className='mx-4 px-2'>Take action</th>
    </tr>
  </thead>
  <tbody>
    {apps && apps.map(app=>(
    <>
    {!app.application_pending && app.application_paid && (
      <tr className='hover:bg-blue-300' key={app._id}>
      <td>{app.application_type}</td>
      <td>{app.createdAt}</td>
      <td className='hover:text-white hover:bg-red-500'><Link to={`/officer/stoneapp/${app._id}`}>Approve</Link></td>
     </tr>
    )}
    </>
    ))}

  </tbody>
</table>

                  </div>
                  <div className='my-4'>
                  <h1 className='font-semibold text-red-500'>Approved Application</h1>

                  </div>
            
                </div>
              
              
              </div>}
                
            </div>
      </div>
  </div>
</div>
)
}

export default StonesApps