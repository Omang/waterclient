import React from 'react'
import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import TheDoc from './Thedoc';

const OnPdf = () => {
  return (
    <div>
        
        <PDFDownloadLink document={<TheDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
        
    </div>
  )
}

export default OnPdf