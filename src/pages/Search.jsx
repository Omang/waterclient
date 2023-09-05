import React, {useState, useContext} from 'react'
import { UserContext } from '../UserContext';
import NotificationContext from '../NotificationContext';
import { GridLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
//import { GridLoader } from 'react-spinners';
import axios from 'axios';

const Search = () => {
    const [search, SetSearch] =useState('');
    const [startx, setStartx] = useState(false);
    const [results, SetResults] =useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const [err, setErr] = useState('');
    const {notificationHandler} = useContext(NotificationContext);

  return (
    <div className='flex flex-col items-center mt-8 p-2'>
      <div className='flex flex-col md:w-[400px] w-[300px]'>
      <h1>Search Contractor</h1>
      <input type="text" placeholder='Type contractor and press enter...' required value={search} onChange={e=>SetSearch(e.target.value)} className='border-b border-blue-500  m-3 px-3' />    
      
      {startx && (
        <>
        {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <>
        {results}
        </> }
        </>
      )}
      <Link className='underline hover:text-blue-600 text-red-600' to={'/'}>Go Back</Link>
      </div>
      </div>
  )
}

export default Search