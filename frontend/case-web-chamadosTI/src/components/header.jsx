import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './header.module.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const nav = useNavigate()
    const [tipoPerfil, setTipoPerfil] = useState('')
    const [fotoPerfil, setFotoPerfil] = useState('')

    const handleLogout = () => {
        localStorage.removeItem('token')
        nav('/login')
    }

    useEffect(() => {
        async function fetchTipoPerfil() {
            const token = localStorage.getItem('token')
            if (!token) {
                nav('/login')
                return
            }

            try {
                const res = await axios.get('http://localhost:3000/perfil', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const usuario = res.data.response?.usuario
                if (usuario?.tipo_perfil) {
                    setTipoPerfil(usuario.tipo_perfil.toLowerCase())
                }
                if (usuario?.foto) {
                    setFotoPerfil(usuario.foto)
                }
            } catch (err) {
                console.error('Erro ao carregar perfil no header:', err)
                if (err.response?.status === 401) {
                    localStorage.removeItem('token')
                    nav('/login')
                }
            }
        }

        fetchTipoPerfil()
    }, [nav])

    const isTecnico = tipoPerfil === 'técnico' || tipoPerfil === 'tecnico'

    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <img src='/logo.png'></img>
                <span>Helpdesk</span>
            </div>
            <div className={styles.menuContainer}>
                <a onClick={() => { nav('/sobre') }}>Sobre</a>
                <a onClick={() => { nav('/') }}>
                    {isTecnico ? 'Área do Técnico' : 'Área do Solicitante'}
                </a>
                <a onClick={() => { nav('/perfil') }}>Perfil</a>
            </div>

            <div className={styles.profileContainer}>
                <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    Log out
                </button>
                <img
                    src={fotoPerfil || '/logo.png'}
                    className={styles.profileImage}
                    onClick={() => nav('/perfil')}
                    alt="Perfil"
                />
            </div>  
        </div>
    )
}
