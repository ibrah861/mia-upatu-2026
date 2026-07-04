import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

// List of all web part (Pages)
import {LandPage} from "./Pages/LandPage" 

// user pages
import { ActivationPage } from './Pages/AuthPages/userPages/ActivationPage';

// Protected Pages
import { UserDashboard } from './Pages/ProtectedPages/UserDashboard';


// Auth pages
import {Signup} from "./Pages/AuthPages/Signup"
import {Signin} from "./Pages/AuthPages/Signin"

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandPage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/activation/:id' element = {<ActivationPage/>}/>
          <Route path='/dashboard' element = {<UserDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
