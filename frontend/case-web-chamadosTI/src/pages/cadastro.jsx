import styles from './auth.module.css'
import { useNavigate } from 'react-router-dom'


export default function Cadastro() {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const nome = event.target.nome.value
    const email = event.target.email.value
    const senha = event.target.senha.value
    const cargo = event.target.cargo.value
    const perfil = event.target.perfil.value

    if (!nome || !email || !senha || !cargo || !perfil) {
      alert("Por favor, preencha todos os campos.")
    } else {
      alert(`Cadastro realizado!\nNome: ${nome}\nEmail: ${email}\nCargo: ${cargo}\nPerfil: ${perfil}`)
      console.log(`Nome: ${nome}\nEmail: ${email}\nSenha: ${senha}\nCargo: ${cargo}\nPerfil: ${perfil}`)
      navigate("/perfil")
    }
  }

  return (
    <div className={styles.bodyContainer}>
      <div className={`${styles.authBox} ${styles.registerBox}`}>
        <a href="/login" className={styles.backLink}>
          ←
        </a>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Helpdesk Logo" />
          <h2>Cadastro</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" placeholder="Digite seu nome" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Digite seu email" required />

          <label htmlFor="senha">Senha</label>
          <input type="text" id="senha" name="senha" placeholder="Digite sua senha" required />

          <label htmlFor="cargo">Cargo/Setor</label>
          <input type="text" id="cargo" name="cargo" placeholder="Digite seu cargo/setor (Ex: Desenvolvedor, Financeiro)" required />

          <label htmlFor="perfil">Tipo de Perfil</label>
          <select id="perfil" name="perfil" required>
            <option value="">Selecione...</option>
            <option value="solicitante">Solicitante</option>
            <option value="tecnico">Técnico</option>
          </select>

          <button type="submit" className={styles.btn}>Salvar</button>
        </form>
      </div>
    </div>
  )
}
