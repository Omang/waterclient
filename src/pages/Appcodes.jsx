import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaEmpire, FaReadme, FaWhmcs, FaAddressBook, FaAward} from "react-icons/fa";
import TeacherMenu from '../components/TeacherMenu';
import axios from 'axios';
import FilesMenu from '../components/FilesMenu';
import { UserContext } from '../UserContext';
import { GridLoader } from 'react-spinners';

const Appcodes = () => {
      //const {id, token, role} = useParams();
  const {user, ready} = useContext(UserContext);
  const [datax, setDatax] = useState('');
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('');
  const [companycodes, setCompanycodes] = useState([]);
  const [allcode, setAllcode] = useState([]);
  const [allsubcode, setAllsubcode] = useState([]);
  const [selectlevecode, setSelectlevelcode] = useState('');
  const [selectsubcode, setSelectsubcode] = useState('');
  const [selectapp, setSelectapp] = useState('');
  const [selectvillage, setSelectvillage] = useState('');
  //console.log(token);
  const Newapplication = async()=>{

   try{
     setLoading(true);
    const {data} = await axios.post('/app/newapp',{
      auth_id: user._id,
      application_type: selectapp,
      application_village: selectvillage,
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
                          <div className="p-4 m-4 flex justify-center">
            <form className='flex flex-col p-2' onSubmit={Newapplication}>
              
          
           <select onChange={handleselectapp} type="text"  className='border-b border-blue-500  m-3 px-3 '>
           
            <option>--Select license Type--</option>
            <option id={'water'} >Water Rights P100 app</option>
            <option id={'borehole'} >Borehole Rights P100 app</option>
          
           </select>

           <select onChange={handleselectvillage} type="text"  className='border-b border-blue-500  m-3 px-3 '>
           
            <option>--Select license Type--</option>
            <option id={'Gantsi'} >Gantsi region</option>
            <option id={'Gaborone'} >Gaborone region</option>
            <option id={'Francistown'} >Francistown region</option>
            <option id={'Chobe'} >Chobe region</option>
            <option id={'Thamaga'} >Thamaga region</option>
            
          
           </select>
          
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
                          <>
                          <div key={place._id} className='border border-blue-500 rounded-lg p-2 m-2'>
                             <p className='font-bold underline text-xl'>Application for:...{place.application_type} rights</p>
                             <p className='font-bold underline text-xl'>Application At:...{place.application_village}</p>
                             <p className='font-bold underline text-xl'>Application cost:...P{place.application_cost}</p>
                             
                          </div>
                          </>
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