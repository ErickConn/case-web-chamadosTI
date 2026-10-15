import styles from './perfil.module.css'
import Header from '../components/header'

export default function Perfil() {
    return (
        <div>
            <Header></Header>
            <div className={styles.bodyContainer}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileImageContainer}>
                        <div className={styles.image}>
                            <img src='/logo.png'></img>
                        </div>
                    </div>
                    <div className={styles.profileInfoContainer}>
                        <h2>Informações</h2>
                        <p><a>Nome: </a><span>Nome do Usuário</span></p>
                        <p><a>Email: </a><span>Email do Usuário</span></p>
                        <p><a>Cargo: </a><span>Cargo do Usuário</span></p>
                        <p><a>Tipo de Perfil: </a><span>Tipo de Perfil do Usuário</span></p>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.deleteButton}>Excluir Perfil</button>
                    <button className={styles.updateButton}>Atualizar Perfil</button>
                </div>
            </div>
        </div >
    )
}
