import React, { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';

const CheckoutForm = ({id}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [redireto, setRedirecto] = useState(null);

    const successHandle = async()=>{
      
      try{
        const {data} = await axios.post('app/successpayment',{
          id: id
        })

        if(data.message){
          setMessage("Payment successful")
        }else{
          console.log(data.something);
        }

      }catch(error){
        console.log(error);
      }

    }

    const handlesubmit = async(e)=>{
         e.preventDefault();
         if(!stripe || !elements){
          return;
         }
         setIsProcessing(true);
         const {error, paymentIntent} = await stripe.confirmPayment({
          elements,
          confirmParams:{
            return_url: `${window.location.origin}/contractor/appsandcodes`
          },
          redirect: 'if_required'
         });
         if(error){
          setMessage(error.message);
         }else if(paymentIntent && paymentIntent.status === 'succeeded'){

          successHandle();

         }else{
          setMessage("Unexpected state");
         }
         setIsProcessing(false);
    }
  return (
    <form id="payment-form" className='border rounded-lg border-blue-500 shadow-2xl p-4' onSubmit={handlesubmit}>
        {message ? <>{message && <div className='text-red-500 text-xl flex flex-col mt-4 mb-2' id="payment-message">
        <p className='font-bold mb-2'>{message}</p> <Link to={`/contractor/appsandcodes`} className='hover:text-black'>click here to go back</Link></div>}
    </> : <>
    <PaymentElement />
        <button className='mt-4 border border-blue-600 bg-blue-400 hover:bg-red-300 text-white px-2 rounded-full' disabled={isProcessing} id="submit">
            <span className='text-white' id="button-text">
              {isProcessing ? "Processing ..." : "Pay now"}
            </span>
        </button>
    </>}
      </form>
  )
}

export default CheckoutForm