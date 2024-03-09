import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ActivationPage from './Pages/ActivationPage'



const App = () => {
  return (
   <BrowserRouter>
     <Routes>
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path='/activation/:activation_token' element={<ActivationPage/>} />

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