import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaEmpire, FaReadme, FaWhmcs, FaAddressBook, FaAward} from "react-icons/fa";
import TeacherMenu from '../components/TeacherMenu';
import axios from 'axios';
import FilesMenu from '../components/FilesMenu';
import { UserContext } from '../UserContext';
import { GridLoader } from 'react-spinners';
import FileUploader from '../components/FileUploader'

const Thebusiness = () => {
     //const {id, token, role} = useParams();
     const {user, ready} = useContext(UserContext);
     const [datax, setDatax] = useState('');
     const [loading, setLoading] = useState(false);
     const [loadingx, setLoadingx] = useState(false);
     const [loadingl, setLoadingl] = useState(false);
     const [company, setCompany] = useState('');
     const [employees, setEmployees] = useState([]);
     const [transactionsphotos, setTransactionsphotos] = useState([]);
     const [bankphotos, setBankphotos] = useState([]);
     const [sms, setSms] = useState('');
     const [smy, setSmy] = useState('');
     //console.log(token);
     const submitBank = async(ev)=>{
      ev.preventDefault();
      try{
        setLoadingx(true);
        const {data} = await axios.post('/contractor/addbankstatements',{
            company_id: company._id,
            company_bankstatements: bankphotos
        });

        if(data){
          setLoadingx(false);
          setSms(data);
        }else{
          setLoadingx(false);
          console.log('something bad happend');
        }

      }catch(e){
        setLoadingx(false);
        console.log(e);
      }
     }
     const submitTransactions = async(ev)=>{
      ev.preventDefault();
      try{
        setLoadingl(true);
        const {data} = await axios.post('/contractor/addtransactions',{
            company_id: company._id,
            company_transactions: transactionsphotos
        });

        if(data){
          setLoadingl(false);
          setSmy(data);
        }else{
          setLoadingl(false);
          console.log('something bad happend');
        }

      }catch(e){
        setLoadingl(false);
        console.log(e);
      }
     }
     const getEmployees = async(datay)=>{
      try{
        console.log(datay);
        const {data} = await axios.post('/contractor/getcompanyemployees', {
          company_name: datay
        })

        if(data){
          setEmployees(data);
        }else{
          console.log('no employees')
        }


      }catch(e){
        console.log(e)
      }
     }
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
           getEmployees(data.company_name);
           
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
        const {data} = await axios.get('/user/getuser/'+ user._id, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.refreshToken}` 
          }
        });
        setDatax(data);
        
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

          <div className=' flex flex-col md:w-[780px] md:h-[440px]'>
          {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <>{company ? <> 
              <h1 className='font-bold text-red-500'>The Business</h1>
              <div className='flex flex-row px-2 my-2'>
                  <div className='w-1/2 flex flex-col'>
                  <h1 className='text-black text-lg underline mb-3'>Bank Statements</h1>
                  {loadingx ? <GridLoader color={'#7ED321'} loading={loadingx} size={5} /> :
                        <>
                         {sms ? 'Upload success. next submit is next month' : <>
                         <form className='flex flex-col p-2 w-full ' onSubmit={submitBank}>
                  <h1 className='text-sm'>Upload ONLY png, jpeg format</h1>
                     <FileUploader addedphotos={bankphotos} onChange={setBankphotos} />
                     <div className="flex flex-row justify-center">
           
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Submit</button>
           
           </div>
                  </form>
                         </>}
                        </>}
                  </div>
                  <div className='w-1/2 flex flex-col'>
                  <h1 className='text-black text-lg underline mb-3'>Business Monthly Transaction</h1>
                  {loadingl ? <GridLoader color={'#7ED321'} loading={loadingl} size={5} /> : 
                  <>
                  {smy ? 'Upload success next submit is next month' : <>
                  <form className='flex flex-col p-2 w-full ' onSubmit={submitTransactions}>
                  <h1 className='text-sm'>Upload ONLY png, jpeg format</h1>
                     <FileUploader addedphotos={transactionsphotos} onChange={setTransactionsphotos} />
                     <div className="flex flex-row justify-center">
           
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Submit</button>
           
           </div>
                  </form>
                  </>}
                  </> }
                  
                  </div>
              </div>
          </>: <>
          <div className='flex justify-center flex-col p-4 m-4'>
          <h1 className='font-bold p-2 m-2'>Please add Company</h1>
          <Link className='w-[300px] rounded-md border border-blue-500 hover:bg-blue-500 shadow-md' to={'/contractor/newcompany'}>Add New</Link>
          </div>
          </>} </>}
          
          </div>
     </div>
  </div>
 </div>
  )
}

export default Thebusiness