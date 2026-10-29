import styles from './auth.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function EsqueciSenha() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const senha = event.target.senha.value

    if (!email || !senha) {
      alert("Por favor, informe seu email e a nova senha.")
    } else {
      alert(`Senha redefinida com sucesso para o email: ${email}`)
      console.log(`Nova Senha: ${senha} para o email: ${email}`)
      navigate("/login")
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
