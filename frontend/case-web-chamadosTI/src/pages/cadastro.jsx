import styles from './auth.module.css'
import { useNavigate } from 'react-router-dom'


export default function Cadastro() {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const usuario = {
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value,
        cargo: form.cargo.value,
        perfil: form.perfil.value
    }

    try {
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Não foi possível cadastrar.')
        }

        alert(data.message)
        console.log(`Nome: ${usuario.nome}\nEmail: ${usuario.email}\nSenha: ${usuario.senha}\nCargo: ${usuario.cargo}\nPerfil: ${usuario.perfil}`)
        navigate('/login')
    } catch (error) {
        alert(error.message)
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
            <option value="técnico">Técnico</option>
          </select>

          <button type="submit" className={styles.btn}>Salvar</button>
        </form>
      </div>
    </div>
  )
}
