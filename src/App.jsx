import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Notification from './utils/Notification'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import MainPage from './pages/MainPage'
import Register from './pages/Register'
import Search from './pages/Search'
import Profile from './components/Profile'
import Appcodes from './pages/Appcodes'
import MessagePage from './pages/MessagePage'
import Admin from './pages/Admin'
import Thebusiness from './pages/Thebusiness'
import Newcompany from './pages/Newcompany'
import PdfPage from './pages/Pdfpage'


axios.defaults.baseURL = 'https://waterserver.onrender.com';

function App() {
  

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
       <Route index element={<IndexPage/>} />
       <Route path='/profile' element={<Profile />} />
       <Route path='/contractor' element={<MainPage/>} />
       <Route path='/register' element={<Register/>} />
       <Route path='/search' element={<Search/>} />
       <Route path='/contractor/appsandcodes' element={<Appcodes/>} />
       <Route path='/contractor/messages' element={<MessagePage/>} />
       <Route path='/contractor/thebusiness' element={<Thebusiness/>} />
       <Route path='/contractor/newcompany' element={<Newcompany/>} />


       <Route path='/admin' element={<Admin/>} />
       
      </Route>
    </Routes>
    <Notification />
    </UserContextProvider>
  )
}

export default App
