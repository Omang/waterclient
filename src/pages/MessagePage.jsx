import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaEmpire, FaReadme, FaWhmcs, FaAddressBook, FaAward} from "react-icons/fa";
import TeacherMenu from '../components/TeacherMenu';
import axios from 'axios';
import FilesMenu from '../components/FilesMenu';
import { UserContext } from '../UserContext';
import { GridLoader } from 'react-spinners';

const MessagePage = () => {
     //const {id, token, role} = useParams();
     const {user, ready} = useContext(UserContext);
     const [datax, setDatax] = useState([]);
     const [nosms, setNosms] = useState('');
     const [loading, setLoading] = useState(false);
     const [company, setCompany] = useState('');
     //console.log(token);
     const getcompany = async()=>{
      setLoading(true);
      try{
        const {data} = await axios.post('/contractor/getcompany',{
          auth_id: user._id
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.refreshToken}` 
          }
        });
        
        if(data){
          setLoading(false);
           setCompany(data);
           getuser();
        }else{
          setLoading(false);
           setCompany('');
          
        }
        
      }catch(e){
        setLoading(false);
        console.log(e);
      }
    }
     const getuser = async()=>{
      try{
        const {data} = await axios.post('/user/allsms', {
          auth_id: user._id
        });
        if(data.message){
          setDatax(data.message);
        }else{
          setNosms('no messages');
        }
        
      }catch(e){
        console.log(e);
      }
    }
    
     useEffect(()=>{
        getcompany();
        
     },[]);
  return (
 <div className='flex flex-row md:px-2 mt-4'>
  <div className='md:block hidden'>
    
     <div className='flex flex-row'>
     
         <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
         <TeacherMenu  />
          </div>

          <div className=' flex flex-col justify-center md:w-[780px] md:h-[440px]'>
          {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <>{company ? <> 
             
             {nosms ? 'No messages yet' : <>
             <div className='flex flex-col px-3 -mt-16 border rounded-md'>
              <h1 className='font-bold text-xl mt-2  text-red-500'>Messages and Notifications</h1>
              {datax.length > 0 && datax.map(item=>(
                <div key={item._id} className='flex flex-col bg-blue-200 border mb-4 border-black'>
                   <h1 className='font-bold bg-blue-500 text-white'>{item.message_type}</h1>
                   <p className='text-sm text-black'>{item.themessage}</p>
                </div>
              ))}

             </div>
             </>}
          </>: <>
          <div className='flex justify-center flex-col p-4 m-4'>
          <h1 className='font-bold p-2 m-2'>Please add new Application</h1>
          <Link className='w-[300px] rounded-md border border-blue-500 hover:bg-blue-500 shadow-md' to={'/contractor/newcompany'}>Add New</Link>
          </div>
          </>} </>}
          
          </div>
     </div>
  </div>
 </div>
  )
}

export default MessagePage