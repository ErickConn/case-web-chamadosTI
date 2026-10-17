import styles from './header.module.css'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <img src='./public/logo.png'></img>
                <span>Helpdesk</span>
            </div>
            <div className={styles.menuContainer}>
                <a>Sobre</a>
                <a>Área do Solicitante</a>
                <a>Perfil</a>
            </div>

            <img src='/logo.png' className={styles.profileImage}>

            </img>
        </div>
    )
}