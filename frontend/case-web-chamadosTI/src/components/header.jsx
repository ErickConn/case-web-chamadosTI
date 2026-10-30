import styles from './header.module.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const nav = useNavigate();

    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <img src='./public/logo.png'></img>
                <span>Helpdesk</span>
            </div>
            <div className={styles.menuContainer}>
                <a onClick={() => { nav("/sobre") }}>Sobre</a>
                <a onClick={() => { nav("/solicitante") }}>Área do Solicitante</a>
                <a onClick={() => { nav("/perfil") }}>Perfil</a>
            </div>

            <img src='/logo.png' className={styles.profileImage} onClick={() => { nav("/perfil") }}>

            </img>
        </div>
    )
}