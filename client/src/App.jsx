import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes,  } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Pages/HomePage'



const App = () => {
  const [user,setUser]=useState(null)


  useEffect(() => {
    const data = localStorage.getItem('user');
    const userData = JSON.parse(data);
    setUser(userData);
}, []);

  return (
   <BrowserRouter>
     <Routes>
     <Route path="/" element={user&&<HomePage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>} />

     </Routes>

     <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
   </BrowserRouter>
  )
}

export default App