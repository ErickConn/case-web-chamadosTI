import styles from './auth.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function EsqueciSenha() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const email = form.email.value
    const novaSenha = form.senha.value

    try {
      const response = await fetch('http://localhost:3000/esqueci-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, novaSenha })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Não foi possível redefinir a senha.')
      }

      alert(data.message)
      console.log(`Email: ${email}\nNova Senha: ${novaSenha}`)
      navigate('/login')
    } catch (error) {
      alert(error.message || 'Não foi possível conectar ao servidor.')
    }
  }

  return (
    <div className={styles.bodyContainer}>
      <div className={`${styles.authBox} ${styles.resetBox}`}>
        <a href="/login" className={styles.backLink}>
          ←
        </a>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Helpdesk Logo" />
          <h2>Nova Senha</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Seu email cadastrado" required />

          <label htmlFor="senha">Nova Senha</label>
          <div className={styles.passwordContainer}>
            <input 
              type={showPassword ? "text" : "password"} 
              id="senha" 
              name="senha" 
              placeholder="Digite sua nova senha" 
              required 
            />
            <span 
              onClick={() => setShowPassword(!showPassword)} 
              className={styles.togglePassword}
            >
              <img 
                src={showPassword 
                  ? "/icone-senha/esconder.png" 
                  : "/icone-senha/mostrar.png"} 
                alt={showPassword ? "Ocultar senha" : "Mostrar senha"} 
              />
            </span>
          </div>

          <button type="submit" className={styles.btn}>Salvar Nova Senha</button>
        </form>
      </div>
    </div>
  )
}
