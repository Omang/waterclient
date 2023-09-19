import React, { useContext, useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import { UserContext } from '../../UserContext';
import axios from 'axios'
import { GridLoader } from 'react-spinners';
import NotificationContext from '../../NotificationContext';
import { Link } from 'react-router-dom';

const Users = () => {
  
  const {user}= useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [emailcheck, setEmailcheck] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [opt, setOpt] = useState('');
  const [appusers, setAppusers] = useState([]);

  const AppUsers = async()=>{
    try{
      setLoading(true);
      const {data} = await axios.post('/admin/appusers',{
        auth_id: user._id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.refreshToken}` 
        }
      })
      if(data.length == 0 || data == undefined){
        setLoading(false);
        console.log(data);
      }else{
        setLoading(false);
        setAppusers(data);
      }


    }catch(e){
      setLoading(false);
      console.log(e)
    }
  }

  const onchangeHandler=(e)=>{

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
    setOpt(option);
    console.log(option);

}

  const adduser =async(e)=>{
    e.preventDefault();
    setLoading(true);
    if(opt == "sel" && !emailcheck){
      setErr('please select role')
        return;
      }else{
        try{
      const {data}= await axios.post('/admin/adduser',{
         firstname:firstname,
         lastname: lastname,
         role: opt,
         password: password,
         mobilenumber: mobilenumber,
         email: email
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.refreshToken}` 
        }
      })
      if(data.message){
        setLoading(false);
        setEmailcheck(true);
      }else{
      setLoading(false);
      notificationHandler({type:'success', message:'User Added successful...'});
      setAppusers(prev=>[data, ...prev]);
      setFirstname('');
      setLastname('');
      setPassword('');
      setEmail('');
      }

    }catch(error){
      setLoading(false);
      notificationHandler({type:'warning', message:'Oops! something bad happend..try again'});
      console.log(error)
    }
      }

  }

  useEffect(()=>{
    AppUsers();
  },[])

  return (
    <div className='flex flex-row md:px-2 mt-4'>
    <div className='md:block hidden'>

        <div className='flex flex-row'>
 
            <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
               <AdminMenu  />
            </div>

            <div className=' flex flex-row gap-6 md:w-[780px] md:h-[440px] p-2 mr-4'>
                <div className="w-1/2 m-2 p-3 flex flex-col">
                <div className=' flex md:ml-4  mt-8'>
      <div className=' border border-blue-500 rounded-2xl shadow-2xl w-[400px]'>
      <h1>Add User</h1>
        {err && (<p className='ml-4 text-sm text-red-500 font-bold uppercase'>
          {err}
        </p>)}
        {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> :
         <form className='flex flex-col p-2' onSubmit={adduser}>
           <input type="text" placeholder='User firstname ' required value={firstname} onChange={e=>setFirstname(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='User lastname' required value={lastname} onChange={e=>setLastname(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="email" placeholder='User email' required value={email} onChange={e=>setEmail(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           {emailcheck &&(
            <h1>Email Exists!</h1>
           )}
           <input type="password" placeholder='User password' required value={password} onChange={e=>setPassword(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='User mobile number' required value={mobilenumber} onChange={e=>setMobilenumber(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <select onChange={onchangeHandler} type="text"  className='border-b border-blue-500  m-3 px-3 '>
           
            <option id={'sel'}>--Select Role--</option>
            <option id={'stonedealer'} >Stone dealer license assessor</option>
            <option id={'cutting'} >Diamond cutting license assessor</option>
            <option id={'exportrough'}>Export / import Rough Diamond permit assessor</option>
            <option id={'kimberly'}>Kimberly Process certificate assessor</option>
            <option id={'inspector'}>Money Laundry Inspector</option>
          
           </select>
          <div className="flex flex-row justify-center">
           
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Submit</button>
           
           </div>
        </form>}
      </div>
    </div>

                </div>
                <div className="w-1/2 ml-8 p-3 flex flex-col">
                  <div className=' items-end justify-end flex flex-col'>
                    <h1 className='text-red-300 text-bold p-3 underline'>User management</h1>
                    {appusers && appusers.map(theone=>(
                      <div key={theone._id} className='ml-4 border border-blue-500 rounded-sm'>
                        {theone.role =="admin" ? '': <Link to={`/admin/users/manageuser/${theone._id}`} className='hover:bg-gray-100 flex flex-row gap-4'>
                          <h1>{theone.firstname}</h1>
                          <h1>{theone.lastname}</h1>
                          <h1>{theone.role}</h1>
                          <h1 className='text-red-400'>Click to manage</h1>
                        </Link>}
                      </div>
                    ))}
                  </div>

                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Users