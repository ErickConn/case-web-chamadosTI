import styles from './auth.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget
        const email = form.email.value
        const senha = form.senha.value

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Não foi possível fazer login.')
            }

            localStorage.setItem('token', data.token)
            console.log(`Email: ${email}\nSenha: ${senha}`)
            navigate('/perfil')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className={styles.bodyContainer}>
            <div className={`${styles.authBox} ${styles.loginBox}`}>
                <div className={styles.logo}>
                    <img src='/logo.png' alt="Helpdesk Logo"></img>
                    <h2>Helpdesk</h2>
                </div>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu email" required />

                    <label htmlFor="senha">Senha</label>
                    <div className={styles.passwordContainer}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="senha" 
                            name="senha" 
                            placeholder="Digite sua senha" 
                            required 
                        />
                        <span 
                            onClick={() => setShowPassword(!showPassword)} 
                            className={styles.togglePassword}
                        >
                            <img 
                            src={showPassword 
                                ? "/icone-senha/mostrar.png"
                                : "/icone-senha/esconder.png"
                            } 
                            alt={showPassword ? "Ocultar senha" : "Mostrar senha"} 
                            />
                        </span>
                    </div>


                    <a href="/esqueci-senha" className={styles.forgot}>Esqueci minha senha</a>
                    <button type="submit" className={styles.btn}>Entrar</button>
                    <a href="/cadastro" className={styles.register}>Ainda não tenho conta</a>
                </form>
            </div>
        </div>
    )
}
