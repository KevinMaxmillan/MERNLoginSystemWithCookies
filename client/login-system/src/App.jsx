import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import axios from 'axios'
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {


  return (
    <>

      <Navbar />
      <Toaster position = 'top-right' toastOptions={{duration: 3000}}/>


      <Routes>
        <Route path ='/' element={<Home/>}/>
        <Route path ='/register' element={<Register/>}/>
        <Route path ='/login' element={<Login/>}/>


      </Routes>

    </>
  )
}


export default App
