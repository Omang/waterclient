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
import Users from './pages/admin/Users'
import Contractors from './pages/admin/Contractors'
import Reports from './pages/admin/Reports'
import UserPage from './pages/admin/UserPage'
import Company from './pages/admin/Company'
import MainCut from './pages/cutting/MainCut'
import MainKim from './pages/kimberly/MainKim'
import MainPermit from './pages/permits/MainPermit'
import MainStone from './pages/stonedealer/MainStone'
import CutApps from './pages/cutting/CutApps'
import CuttingApplication from './pages/cutting/CuttingApplication'
import KimApps from './pages/kimberly/KimApps'
import KimApplication from './pages/kimberly/KimApplication'
import PermitApplication from './pages/permits/PermitApplication'
import PermitApps from './pages/permits/PermitApps'
import StoneApplication from './pages/stonedealer/StoneApplication'
import StonesApps from './pages/stonedealer/StonesApps'



axios.defaults.baseURL = 'http://localhost:3000';

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
       <Route path='/admin/contractors' element={<Contractors/>} />
       <Route path='/admin/users' element={<Users/>} />
       <Route path='/admin/reports' element={<Reports/>} />
       <Route path='/admin/users/manageuser/:id' element={<UserPage />} />
       <Route path='/admin/singlecompany/:id' element={<Company />} />

       <Route path='/officer/kimberly' element={<MainKim />} />
       <Route path='/officer/kimapps' element={<KimApps />} />
       <Route path='/officer/kimapp/:id' element={<KimApplication />} />

       <Route path='/officer/cutting' element={<MainCut />} />
       <Route path='/officer/cuttingapplications' element={<CutApps />} />
       <Route path='/officer/cuttingapp/:id' element={<CuttingApplication />} />


       <Route path='/officer/permits' element={<MainPermit />} />
       <Route path='/officer/permitsapps' element={<PermitApps />} />
       <Route path='/officer/permitapp/:id' element={<PermitApplication />} />

       <Route path='/officer/stones' element={<MainStone />} />
       <Route path='/officer/stonesapps' element={<StonesApps />} />
       <Route path='/officer/stoneapp/:id' element={<StoneApplication />} />
       
      </Route>
    </Routes>
    <Notification />
    </UserContextProvider>
  )
}

export default App
