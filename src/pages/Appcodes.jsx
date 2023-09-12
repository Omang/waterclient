import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaEmpire, FaReadme, FaWhmcs, FaAddressBook, FaAward} from "react-icons/fa";
import TeacherMenu from '../components/TeacherMenu';
import axios from 'axios';
import FilesMenu from '../components/FilesMenu';
import { UserContext } from '../UserContext';
import { GridLoader } from 'react-spinners';
import FileUploader from '../components/FileUploader';

const Appcodes = () => {
      //const {id, token, role} = useParams();
  const {user, ready} = useContext(UserContext);
  const [datax, setDatax] = useState('');
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [companycodes, setCompanycodes] = useState([]);
  const [allcode, setAllcode] = useState([]);
  const [allsubcode, setAllsubcode] = useState([]);
  const [addedphotos, setAddedphotos] = useState([]);
  const [selectlevecode, setSelectlevelcode] = useState('');
  const [selectsubcode, setSelectsubcode] = useState('');
  const [selectapp, setSelectapp] = useState('');
  const [selectvillage, setSelectvillage] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [cvvnumber, setCvvnumber] = useState('');
  const [appid, setAppid] = useState('');
  const [loadx, setLoadx] = useState(false);
  const [paymentmade, setPaymentmade] = useState(false);
  //console.log(token);
  const Newapplication = async(e)=>{
     e.preventDefault();
     if(selectapp == 'sel'){
        setError('please select a license type')
        return;
     }else if(addedphotos === undefined || addedphotos.length == 0){
      setError('please add atleast one attachment')
      return;
     }else{

      try{
        setLoading(true);
       const {data} = await axios.post('/app/newapp',{
         auth_id: user._id,
         application_type: selectapp,
         application_attachment: addedphotos,
         application_cost: "100",
       },{
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${user.refreshToken}` 
         }
       });
       setLoading(false);
       setCompanycodes(data);
   
      }catch(e){
       setLoading(false);
       console.log(e);
      }

     }
   

  }
 

  const checkcodes = async ()=>{
    try{

      const {data} = await axios.post('/app/viewcodes',{
        auth_id: user._id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.refreshToken}` 
        }
      })

      setCompanycodes(data);
      console.log(data.length);

    }catch(e){
      console.log(e);
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
         getuser();
         checkcodes();
      }else{
        setLoading(false);
      setCompany(data);
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

  const payApp = async(e)=>{
      e.preventDefault();
    console.log(cardnumber);
    console.log(cvvnumber);
    console.log(appid);

  }
 
  useEffect(()=>{
     getcompany();
     
  },[]);

 

const handleselectapp=(e)=>{

  const index = e.target.selectedIndex;
  const el = e.target.childNodes[index]
  const option =  el.getAttribute('id');
  
  console.log(option);
  setSelectapp(option);

}
const handleselectvillage=(e)=>{

  const index = e.target.selectedIndex;
  const el = e.target.childNodes[index]
  const option =  el.getAttribute('id');
  
  console.log(option);
  setSelectvillage(option);

}

  
  return (
    <div className='flex flex-row md:px-2 mt-4'>
        <div className='md:block hidden'>
        
        <div className='flex flex-row'>
         
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <TeacherMenu  />
            </div>

            <div className=' flex flex-row md:w-[780px] md:h-[440px] p-2'>
            {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <>{company ? <> <div className="w-1/2">
                       New Application
                       {companycodes.length !== 0 ? <>
                          
                         </>: <>
                          <div className="p-4 m-4 flex  w-[400px]">
            
            <form className='flex flex-col p-2 w-full ' onSubmit={Newapplication}>
              {error &&(
                <div>
                  <p className="text-lg text-red-500">{error}</p>
                </div>
              )}
              
            
           <select onChange={handleselectapp} type="text"  className='border-b border-blue-500  m-3 px-3 '>
            <option id={'sel'}>--Select license Type--</option>
            <option id={'PSDL'} >Precious Stone Dealer License</option>
            <option id={'DCL'} >Diamond Cutting License</option>
            <option id={'ERDP'} >Export Rough Diamond Permit</option>
            <option id={'KPC'} >Kimberly Process Certificate</option>
          
           </select>
            <h1 className='text-xl'>Upload supporting docs ONLY png, jpeg</h1>
           <FileUploader addedphotos={addedphotos} onChange={setAddedphotos} />
          
           <div className="flex flex-row justify-center">
           
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Submit</button>
           
           </div>
          
           
          </form>
                          </div>
                         </>}
                      </div>
                      <div className="w-1/2">
                       Your Pending Applications
                       {companycodes ? <>
                        {companycodes.length > 0 && companycodes.map(place=>(
                          <div key={place._id}>
                          <div  className='border flex flex-col border-blue-500 rounded-sm p-2 m-2'>
                             <p className='font-bold underline text-xl'>Application for:...{place.application_type}</p>
                             
                             <p className='font-bold underline text-xl'>Application cost:...P{place.application_cost}</p>
                            {!place.application_pending && (
                              <>
                              {loadx ? <GridLoader color={'#7ED321'} loading={loadx} size={5} /> :
                              
                             <>
                             {paymentmade ? <>
                                <p className='text-xl text-red-500'>Application Payment Made.</p>
                             </>: 
                             <form onSubmit={payApp} className='flex flex-col border-rose-600 border bg-rose-200 p-3 my-2'>
                             <input type='text' value={cardnumber} onChange={e=>setCardnumber(e.target.value)} className='border-b border-rose-900 mt-2 p-2' placeholder='Card Number' />
                             <input type='text' value={cvvnumber} onChange={e=>setCvvnumber(e.target.value)} className='border-b border-rose-900 mt-2 p-2' placeholder='Cvv' />
                             
                             <div className='flex mt-3 items-center justify-center'>
                                  <button type='submit' className='border rounded-full px-2 bg-blue-500 text-white hover:bg-gray-500'>Pay</button>
                             </div>
                            </form>
                             }
                             </>
                              }
                              </>
                            )} 
                          </div>
                          </div>
                        ))}
                       </>: <>
                        No Applications, Please apply
                       </>}
                      </div></> : 
                      <>
                      <div className='flex justify-center flex-col p-4 m-4'>
          <h1 className='font-bold p-2 m-2'>Please add new Application</h1>
          <Link className='w-[300px] rounded-md border border-blue-500 hover:bg-blue-500 shadow-md' to={'/contractor/newcompany'}>Add New</Link>
          </div>
                      
                      </>}</>}
            
                      
                </div>
         </div>
       </div>
    </div>
  )
}

export default Appcodes