import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Perfil from './pages/perfil.jsx'
import Login from './pages/login.jsx'
import Cadastro from './pages/cadastro.jsx'
import EsqueciSenha from './pages/esqueci-senha.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
