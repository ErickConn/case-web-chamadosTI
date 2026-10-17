import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Perfil from './pages/perfil.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
