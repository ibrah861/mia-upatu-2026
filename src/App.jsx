import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

// List of all web part (Pages)
import {LandPage} from "./Pages/LandPage" 


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
        </Routes>
      </BrowserRouter>
    </>
  )
}
