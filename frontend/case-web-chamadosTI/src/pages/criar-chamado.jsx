import styles from './criar-chamado.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Feedback from '../components/feedback'

export default function CriarChamado() {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState(null)
  const [salvando, setSalvando] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback(null)

    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const formulario = event.currentTarget
    const dados = {
      titulo: formulario.titulo.value.trim(),
      categoria: formulario.categoria.value,
      prioridade: formulario.prioridade.value,
      descricao: formulario.descricao.value.trim(),
    }

    setSalvando(true)
    try {
      const response = await axios.post('http://localhost:3000/chamados', dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setFeedback({
        tipo: 'sucesso',
        mensagem: response.data.response?.message || 'Chamado criado com sucesso.'
      })
      window.setTimeout(() => navigate('/solicitante'), 1200)
    } catch (err) {
      console.error('Erro ao criar chamado:', err)
      setFeedback({
        tipo: 'erro',
        mensagem:
          err.response?.data?.response?.message ||
          err.response?.data?.message ||
          'Não foi possível salvar o chamado. Tente novamente.'
      })
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className={styles.bodyContainer}>
      <Feedback
        tipo={feedback?.tipo}
        mensagem={feedback?.mensagem}
        onClose={() => setFeedback(null)}
      />
      <div className={styles.registerBox}>
        <a onClick={() => navigate(-1)} className={styles.backLink}>
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
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="acesso">Acesso</option>
            <option value="rede">Rede</option>
            <option value="outros">Outros</option>
          </select>

          <label htmlFor="prioridade">Prioridade</label>
          <select id="prioridade" name="prioridade" required>
            <option value="">Selecione...</option>
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
            <option value="urgente">Urgente</option>
          </select>

          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" name="descricao" placeholder="Descreva o problema" required></textarea>

          <button type="submit" className={styles.btn} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  )
}