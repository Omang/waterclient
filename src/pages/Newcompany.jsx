import React,{useState, useContext} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import {UserContext} from '../UserContext'
import NotificationContext from "../NotificationContext";
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import FilesMenu from '../components/FilesMenu';
import TeacherMenu from '../components/TeacherMenu';

const Newcompany = () => {
  const {user, ready} = useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [err, setErr] = useState(false);
  const [companyemail, setCompanyemail] = useState('');
  const [bankname, setBankname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [postaladd, setPostaladd] = useState('');
  const [physicaladd, setPhysicaladd] = useState('');
  const [bankbranch, setBankbranch] = useState('');
  const [owner, setOwner] = useState('');
  const [accountnumber, setAccountnumber] = useState('');
  const [directors, setdirectors] =useState(false);
  const [asset, setAsset] = useState(false);
  const [cipa, setCipa] = useState(null);
  const [cipaerror, setCipaerror] = useState(false);
  const [cipanumber, setCipanumber] = useState('');
 //console.log(user);
  const onchangeHandler=(e)=>{

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
    setOwner(option);
    console.log(option);

}
const updateprofile =async(e)=>{
  e.preventDefault();
  try{
     setLoading(true);
    const {data} = await axios.post('/contractor/addcompany',{
      auth_id: user._id,
      company_name: cipa.company_name,
      company_cipa: cipa.company_cipa,
      company_directors: cipa.company_directors,
      company_ownership: owner,
      bank_name: bankname,
      bank_branch: bankbranch,
      bank_number: accountnumber,
      postal_address: postaladd,
      physical_address: physicaladd
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.refreshToken}` 
      }
    });
    setLoading(false);
    notificationHandler({type:'success', message:'Company added successfully'});
    setRedirect('/contractor/appsandcodes');
     

  }catch(e){
    setLoading(false);
    setErr(true);
    console.log(e);
  }

}
const checkcipa = async(ev)=>{
  ev.preventDefault();
  try{
    setLoading(true);
      const {data} = await axios.post('/contractor/checkcipa', {
        company_cipa:cipanumber
      })
      if(data.message){
        setLoading(false);
        setCipa(data.message);
      }else{
        setLoading(false);
        setCipaerror(true);
      }
  }catch(e){
    setLoading(false);
    console.log(e)
  }
}



if(redirect){
  return <Navigate to={redirect} />
}
    
  return (
    <div className='flex flex-row md:px-2 mt-4'>
  <div className='md:block hidden'>
    
     <div className='flex flex-row'>
     
         <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
         <TeacherMenu  />
          </div>

          <div className='flex flex-col md:w-[780px] md:h-[440px]'>
            
                <div className=' flex md:ml-4  mt-8'>
      <div className=' border border-blue-500 rounded-2xl shadow-2xl w-[400px]'>
        <h1>Company details</h1>
        {cipa ? <>
          {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <form className='flex flex-col p-2' onSubmit={updateprofile}>

        {err && (<p className='ml-4 text-sm text-red-500 font-bold uppercase'>
          Something wrong happend! try again.
        </p>)}
           <label>Cipa Details</label>
           <p>Company name: <strong className='text-2xl'>{cipa.company_name}</strong> </p>
           <p className='font-semibold text-red-500'>Other data is behind the scene. fill up the below form </p>
           <select onChange={onchangeHandler} type="text"  className='border-b border-blue-500  m-3 px-3 '>
           
            <option>--Ownership--</option>
            <option id={'motswana'} >100% locally owned</option>
            <option id={'mix'} >locally and foregin owned</option>
            <option id={'women'} > 100% locally women owned</option>
            <option id={'youth'} > 100% locally Youth owned</option>
          
           </select>
           <input type="email" placeholder='Enter Company email ' required value={companyemail} onChange={e=>setCompanyemail(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="number" placeholder='Enter Company phonenumber' required value={phonenumber} onChange={e=>setPhonenumber(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='address like p.o.box 11 Ncojane ' required value={postaladd} onChange={e=>setPostaladd(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='address like plot: 1234 Ncojane' required value={physicaladd} onChange={e=>setPhysicaladd(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <label>Bank details</label> 
           <input type="text" placeholder='Bank name' required value={bankname} onChange={e=>setBankname(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='Bank Branch' required value={bankbranch} onChange={e=>setBankbranch(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='Account number' required value={accountnumber} onChange={e=>setAccountnumber(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />

           
           <div className="flex flex-row justify-center">
           
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Submit</button>
           
           </div>
        </form>}
          
        </> : <>{err && (<p className='ml-4 text-sm text-red-500 font-bold uppercase'>
          Something wrong happend! try again.
        </p>)}
        {cipaerror && (<p className='ml-4 text-sm text-red-500 font-bold uppercase'>
          Your company is no available at cipa. try again or contact CIPA.
        </p>)}
        {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <><form className='flex flex-col p-2' onSubmit={checkcipa}>
      <input type="number" placeholder='Enter Cipa number' required value={cipanumber} onChange={e=>setCipanumber(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
      <div className="flex flex-row justify-center">
           
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Submit</button>
           
           </div>
      </form> </>}
      

        
        
        </>}
        
        
      </div>
    </div>
              
          </div>
     </div>
  </div>
 </div>
  )
}

export default Newcompany