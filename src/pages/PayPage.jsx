import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaEmpire, FaReadme, FaWhmcs, FaAddressBook, FaAward} from "react-icons/fa";
import TeacherMenu from '../components/TeacherMenu';
import axios from 'axios';
import FilesMenu from '../components/FilesMenu';
import { UserContext } from '../UserContext';
import { GridLoader } from 'react-spinners';
import FileUploader from '../components/FileUploader';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';


const PayPage = ()=>{
  const {user, ready} = useContext(UserContext);
  const [datax, setDatax] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const [itemid, setItemid] = useState('');
  const [paysuccess, setPaysuccess] = useState(false);
  const [err, setErr] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [ClientSecret, setClientSecret] = useState('');

  
  
  const payApp =async()=>{
    
    try{

      const {data} = await axios.post('/app/apppay',{
          id: id
      })

      console.log(data);
      //setClientSecret('pi_3NqcZvHhA7Ia0RGs1605TGpQ_secret_sa2JlDiwXnOsBmvllX836gEFS');
      const options = {
        // passing the client secret obtained from the server
          clientSecret: data.clientSecret,
        };
        setClientSecret(options)


    }catch(error){
       console.log(error);
    }
   }

  const getApp =async()=>{

    try{
        setLoading(true);
        const {data}= await axios.get(`/app/appget/${id}`,{

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.refreshToken}` 
              }

        });
        if(data){

        setLoading(false);
        setItemid(data);
        //console.log(data);
        getkey();
        payApp();
        setDatax(data);

        }else{
        setLoading(false);
        setErr('something bad happend');
        }


    }catch(e){
        setLoading(false);
        console.log(e);
    }

  }
  const getkey = async()=>{
    try{

      const {data} = await axios.post('/app/getstripekey', {
        id: id
      });
      //console.log(data.publish_key);
      setStripePromise(loadStripe(data.publish_key));

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    if(!id){
        return;
    };
    getApp()
  },[id])


  return (
    <>
   
   <div className='flex flex-row md:px-2 mt-4'>
        <div className='md:block hidden'>
        
        <div className='flex flex-row'>
         
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <TeacherMenu  />
            </div>

            <div className=' flex flex-col md:w-[780px] md:h-[440px] p-2'>
            {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : 
            <>
                {err && (
                  <>
                  <div className='flex mt-3 items-center justify-center'>
                              <h1 className='text-xl text-red-500 underline'>{err}</h1>
                              </div>
                  </>
                )}
                          {paysuccess ? <>
                            <div className='flex mt-3 items-center justify-center'>
                              <Link to={'/contractor/appsandcodes'} className='border rounded-full px-2 bg-blue-500 text-white hover:bg-gray-500'>Payment Successful. press to go Back</Link>
                              </div>
                          </> : 
                          <div className='flex mt-3 items-center justify-center p-4'>
                           {stripePromise && ClientSecret && (
                            <Elements stripe={stripePromise} options={ClientSecret}>
                            <CheckoutForm id={id} />
                           </Elements>
                           )}
                           
                          
                     </div>
                          }
            
            </>}
            </div>
        </div>
        </div>
    </div>

    
    </>
  )
    
}

export default PayPage