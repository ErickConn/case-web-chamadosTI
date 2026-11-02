import styles from './criar-chamado.module.css'
import { useNavigate } from 'react-router-dom'

export default function CriarChamado() {

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const titulo = event.target.titulo.value
    const categoria = event.target.categoria.value
    const prioridade = event.target.prioridade.value
    const descricao = event.target.descricao.value
    

    if (!titulo || !categoria || !prioridade || !descricao) {
      alert("Por favor, preencha todos os campos.")
    } else {
      alert(`O chamado foi criado!\nTítulo: ${titulo}\nCategoria: ${categoria}\nPrioridade: ${prioridade}\nDescrição: ${descricao}`)
      console.log(`Título: ${titulo}\nCategoria: ${categoria}\nPrioridade: ${prioridade}\nDescrição: ${descricao}`)
      navigate("/perfil")
    }
  }
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.registerBox}>
        <a href="/login" className={styles.backLink}>
          ←
        </a>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Helpdesk Logo" />
          <h2>Chamado</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo">Título</label>
          <input type="text" id="titulo" name="titulo" placeholder="Titulo do chamado" required />


          <label htmlFor="categoria">Categoria</label>
          <select id="categoria" name="categoria" required>
            <option value="">Selecione...</option>
            <option value="suporte">1</option>
            <option value="administrativo">2</option>
            <option value="gerencia">3</option>
            <option value="financeiro">4</option>
            <option value="outros">Outros</option>
          </select>

          <label htmlFor="prioridade">Prioridade</label>
          <select id="prioridade" name="prioridade" required>
            <option value="">Selecione...</option>
            <option value="solicitante">1</option>
            <option value="tecnico">2</option>
          </select>

          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" name="descricao" placeholder="Descreva o problema" required></textarea>

          <button type="submit" className={styles.btn}>Salvar</button>
        </form>
      </div>
    </div>
  )
}