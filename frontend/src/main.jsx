import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <ToastContainer 
      position='top-center'
      autoClose={3000}
    />
  </BrowserRouter>
  
)
