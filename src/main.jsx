import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'
import "./Pages/AuthPages/AuthStyle/Auth.css"
import "./Loader/Loader.css"
import "./Pages/ProtectedPages/generalStyle.css"

createRoot(document.getElementById('root')).render(
  
    <App />

)
