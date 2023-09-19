import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaReadme, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../../NotificationContext';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import InspectorMenu from './InspectorMenu'

const ActivityPage = () => {
    const {user}= useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const [loadingx, setLoadingx] = useState(false);
    const [sentok, setSentok] = useState(false);
    const [company, setCompany] = useState('');
    const [thesubject, setThesubject] = useState('');
    const [thedescription, setThedescription] = useState('');
    const {id} = useParams();


    const sendactivity =async(ev)=>{
        ev.preventDefault();
        try{
            setLoadingx(true);
            const {data} = await axios.post('/contractor/activitysend', {
                user_id: user.id,
                auth_id: company.auth_id,
                company_id: id
            })
            setLoadingx(false);
            setSentok(true);

        }catch(e){

            setLoadingx(false);
            console.log(e);
            
        }

    }

    const getthecompany = async()=>{
        try{
            setLoading(true);
            const {data} = await axios.post('/contractor/onecompany', {
                company_id: id
            });
            setLoading(false);
            setCompany(data);
            console.log(data);

        }catch(e){
            setLoading(false);
            console.log(e);
        }
    }
    useEffect(()=>{
        if(!id){
             return;
            }
        getthecompany();

    },[id])
  return (
    <>

<div className='flex flex-row md:px-2 mt-4'>
  <div className='md:block hidden'>

      <div className='flex flex-row'>

          <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          
            <InspectorMenu  />
          </div>

          <div className=' flex flex-col md:w-[780px] p-2'>
            {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : 
            <>
              <div className='flex flex-col justify-center items-center px-2 mx-2'>
                {company && (
                    <>
                      {sentok ? 'Report published Successful' : <form onSubmit={sendactivity} className='border flex flex-col border-blue-500 m-2 p-2'>
                         <label>Subject</label> 
                         <input type="text" placeholder='The Subject' required value={thesubject} onChange={e=>setThesubject(e.target.value)} className='border-b border-blue-500 m-3 px-3' />
                         <label>The description</label> 
                         <textarea type="text" value={thedescription} onChange={e=>setThedescription(e.target.value)} className='border-b border-blue-500 m-3 px-3'  />
                         <div className="flex flex-col justify-center items-center">
           
                       <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Publish</button>
           
                      </div>
                      </form>}
                    </>
                )}
                  
              </div>
            </>}
          </div>
      </div>
    </div>

    </div>
    
    </>
  )
}

export default ActivityPage