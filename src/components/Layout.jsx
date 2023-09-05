import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  const [theme, setTheme] = useState('light');
  useEffect(()=>{
       if(theme === 'dark'){
        document.documentElement.classList.add('dark');
       }else{
        document.documentElement.classList.remove('dark');
       }
  }, [theme])
  return (
    <div className='p-2 flex dark:bg-gray-300 flex-col bg-white h-screen'>
       <button onClick={e=>setTheme(theme ==="dark" ? "light" : "dark")} className='bg-white w-[100px] border rounded-sm text-xs border-blue-700 hover:bg-blue-500 hover:text-white'>change Theme color</button>
      <Header />
      <Outlet />
    
      
    </div>
  )
}

export default Layout
