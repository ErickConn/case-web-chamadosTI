import styles from './auth.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Feedback from '../components/feedback'

export default function EsqueciSenha() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback(null)
    setEnviando(true)

    const form = event.currentTarget
    const email = form.email.value.trim()
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

      setFeedback({
        tipo: 'sucesso',
        mensagem: data.message || 'Senha redefinida com sucesso.'
      })
      window.setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      setFeedback({
        tipo: 'erro',
        mensagem: error.message || 'Não foi possível conectar ao servidor.'
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.bodyContainer}>
      <Feedback
        tipo={feedback?.tipo}
        mensagem={feedback?.mensagem}
        onClose={() => setFeedback(null)}
      />
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

          <button type="submit" className={styles.btn} disabled={enviando}>
            {enviando ? 'Salvando...' : 'Salvar Nova Senha'}
          </button>
        </form>
      </div>
    </div>
  )
}
