import { useEffect, useState } from 'react'
import authservice from './conf/auth.js';
import './App.css'
import { useDispatch } from 'react-redux';
import {login,logout} from "../src/store/authSlice.js"
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';


function App() {

  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO:<Outlet/>
        </main>
        <Footer/>
      </div>

    </div>
  ): null
}

export default App
