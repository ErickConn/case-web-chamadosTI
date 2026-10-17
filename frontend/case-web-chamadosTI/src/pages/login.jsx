import styles from './login.module.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const senha = event.target.senha.value

        if (!email || !senha) {
            alert("Por favor, preencha todos os campos.")
        } else {
            alert(`Login realizado com sucesso!\nEmail: ${email}`)
            console.log(`Login realizado com sucesso!\nEmail: ${email}\nSenha: ${senha}`)
            navigate("/perfil")
        }
    }

    return (
        <div className={styles.bodyContainer}>
            <div className={styles.loginBox}>
                <div className={styles.logo}>
                    <img src='/logo.png' alt="Helpdesk Logo"></img>
                    <h2>Helpdesk</h2>
                </div>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Digite seu email" required></input>
                    
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" placeholder="Digite sua senha" required></input>

                    <a href="#" className={styles.forgot}>Esqueci minha senha</a>
                    <button type="submit" className={styles.btn}>Entrar</button>
                    <a href="/cadastro" className={styles.register}>Ainda não tenho conta</a>
                </form>
            </div>
        </div>
    )
}
