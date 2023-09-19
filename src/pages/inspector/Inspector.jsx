import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaReadme, FaAddressBook, FaUsers, FaTh} from "react-icons/fa";
import NotificationContext from '../../NotificationContext';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import InspectorMenu from './InspectorMenu';
import {saveAs} from "file-saver";

const Inspector = () => {
    const {user}= useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState('');
    const {id} = useParams();

    const handleClick = (e, item)=>{
        e.preventDefault();
        let url = `http://localhost:3000/uploads/${item}`
        saveAs(url, "companyData");
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
            <div className='flex flex-row justify-between my-2 mx-3'>
                {company && (
                    <>
                    <h1 className='text-red-500 font-bold px-2'>Company_Name:...{company.company_name}</h1>
                    </>
                )}
            </div>
              <div className='flex flex-row px-2 mx-2'>
                {company && (
                    <>
                    <div className='w-1/2 flex flex-col'>
                       <h1 className='text-lg text-red-500'>Bank statement</h1>
                       {company.company_bankstatements && company.company_bankstatements.map(itemx=>(
                        <div key={itemx} className='w-[300px] flex flex-col h-[150px]'>
                            <button className='border rounded-full bg-blue-500 text-white p-2 hover:bg-red-500' onClick={(e)=>handleClick(e, itemx)}>Dowload Statement</button>
                        <img src={`http://localhost:3000/uploads/${itemx}`} />
                       </div>
                       ))}
                    </div>
                    <div className='w-1/2 flex flex-col'>
                       <h1 className='text-lg text-red-500'>Business Process report</h1>
                       {company.company_transactions && company.company_transactions.map(item=>(
                        <div key={item} className='w-[300px] h-[150px] flex flex-col'>
                            <button className='border rounded-full bg-blue-500 text-white p-2 hover:bg-red-500' onClick={(e)=>handleClick(e, item)}>Dowload Report</button>
                        <img src={`http://localhost:3000/uploads/${item}`} />
                      </div>
                       ))}

                    </div>
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

export default Inspector