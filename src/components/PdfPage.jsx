import React from 'react'
import {Document, View, Text, Image, Page, StyleSheet} from '@react-pdf/renderer'
import download from '../assets/download.jpg';



const PdfPage =({cheader, company})=>{
    const styles = StyleSheet.create({
        page: {
            padding: 20,
            alignItems: 'center',
            backgroundColor: "#fff",
        },
        text: {
            color: '#228b22',
        }, 
       layout: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff"
    },
    header:{
        padding: 20,
    },
    
    img: {
        maxWidth: 150
    },
    
    content:{
        marginTop: 100
    },
    
    h1:{
        fontSize: 36,
        margin: 0,
    },
    
    h2:{
        fontSize: 24,
        margin: 0,
    },
    
    h3:{
        fontSize: 18,
        margin: 0
    },
    
    h4: {
        fontSize: 16,
        margin: 0
    }
  
    
    });
    return (
       <>
        <Document>
      <Page style={styles.page}>
         <View style={styles.layout}>
            <View style={styles.header}>
                <Image src={download} />
            </View>
            <View >
                <Text >Certificate</Text>
                <Text>This is to certify that</Text>
                <Text >{company.company_name}</Text>
                <Text>has successfully approved for</Text>
                <Text >{cheader.application_type}</Text>
                <Text>On this</Text>
                <Text >{cheader.updateAt}</Text>
                <Text>Check Code</Text>
                <Text >{cheader._id}</Text>
            </View>
          </View>
      </Page>
  </Document>
       </>
    )
}

export default PdfPage