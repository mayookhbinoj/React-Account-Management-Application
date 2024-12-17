import React, { useEffect } from 'react'
import {BrowserRouter as Router,Route,Routes, useNavigate,} from "react-router-dom"
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
const Routers = () => {
  const navigate=useNavigate()
// checking the user 
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        navigate("/Home")
      }else{
        if (location.pathname === "/Register") {
          navigate("/Register");
        } else {
          navigate("/");
        }
      }
    })
  },[])

  return (
    <div>
       <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Home' element={<Home/>} />
      </Routes> 
    </div>
  )
}

export default Routers
