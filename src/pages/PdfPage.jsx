import React, {useState} from 'react'
import OnPdf from './Onpdf';



const PdfPage = () => {
    const [presson, setPresson]= useState(false);
  return (
    <div>
        {presson && (
            <OnPdf />
           
        )}
        <button className='border border-yellow-800 rounded-full p-3 mx-8 bg-blue-500 hover:bg-red-500' onClick={(e)=>setPresson(true)}>Pdf on</button>
    </div>
  )
}

export default PdfPage


