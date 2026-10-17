import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Perfil from './pages/perfil.jsx'
import Login from './pages/login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />  
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
