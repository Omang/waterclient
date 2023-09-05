import React,{useState, useContext} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import {UserContext} from '../UserContext'
import NotificationContext from "../NotificationContext";
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import Logout from './Logout';

const Profile = () => {
  //const {id, token, role} = useParams();
  const {user, ready} = useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [err, setErr] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [pob, setPob] = useState('');
  const [mobilenum, setMobilenum] = useState('');
  const [nationality, setNationality] = useState('');
  //const { _id, refreshToken} = user;
  
 

  const updateprofile = async(ev)=>{
      ev.preventDefault();
      setLoading(true);
      try{
         const addprofile = await axios.put('/user/updatecontractor', {
          auth_id: user._id,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          DOB: dob,
          POB: pob,
          nationality: nationality,
          mobilenumber: mobilenum
         },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.refreshToken}` 
          }
        });
        if(addprofile){
          setLoading(false);
          notificationHandler({type:'success', message:'Profile created success...Good work'});
           
                 setRedirect(`/contractor`);
          
        }
      }catch(e){
        setLoading(false);
        console.log(e);
      }
  }

  const onchangeHandler=(e)=>{

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
    setGender(option);
    console.log(option);

}
if(redirect){
  return <Navigate to={redirect} />
}
  return (
    <div className='md:flex md:flex-row flex-col md:px-4 sm:justify-center sm:items-center mt-2'>
        <div className='md:flex mr-2 md:flex-col hidden w-[320px] h-[220px]'>
             <Logout />
            </div>

        <div className=' flex flex-col md:w-[780px] md:h-[440px]'>
          
        <div className=' flex md:ml-4  mt-8'>
      <div className=' border border-blue-500 rounded-2xl shadow-2xl w-[400px]'>
      <h1>User Profile</h1>
        {err && (<p className='ml-4 text-sm text-red-500 font-bold uppercase'>
          Something wrong happend! try again.
        </p>)}
        {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <form className='flex flex-col p-2' onSubmit={updateprofile}>
           <input type="text" placeholder='Enter your firstname ' required value={firstname} onChange={e=>setFirstname(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='Enter your lastname' required value={lastname} onChange={e=>setLastname(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <select onChange={onchangeHandler} type="text"  className='border-b border-blue-500  m-3 px-3 '>
           
            <option>--Select Gender--</option>
            <option id={'male'} >Male</option>
            <option id={'female'} >Female</option>
          
           </select>
           <label>Birth date</label>
           <input type="date" placeholder='Date of Birth' required value={dob} onChange={e=>setDob(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='Place of birth ' required value={pob} onChange={e=>setPob(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="number" placeholder='Contact number' required value={mobilenum} onChange={e=>setMobilenum(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />

           <input type="text" placeholder='Nationality' required value={nationality} onChange={e=>setNationality(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <div className="flex flex-row justify-center">
           
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Submit</button>
           
           </div>
        </form>}
      </div>
    </div>
        </div>

    </div>
  )
}

export default Profile