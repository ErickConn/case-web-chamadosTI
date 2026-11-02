import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/header'
import Dashboard from '../components/dashboard'
import FiltrosChamados from '../components/filtrosChamados'
import TabelaChamados from '../components/tabelaChamados'
import styles from './solicitante.module.css'

function aplicarFiltros(lista, filtros) {
    return lista.filter((chamado) => {
        const matchStatus =
            !filtros.status ||
            chamado.status?.toLowerCase().includes(filtros.status.toLowerCase())

        const matchPrioridade =
            !filtros.prioridade ||
            chamado.prioridade?.toLowerCase() === filtros.prioridade.toLowerCase()

        const matchCategoria =
            !filtros.categoria ||
            chamado.categoria?.toLowerCase() === filtros.categoria.toLowerCase()

        return matchStatus && matchPrioridade && matchCategoria
    })
}

export default function Solicitante() {
    const navigate = useNavigate()
    const [meusChamados, setMeusChamados] = useState([])
    const [todosChamados, setTodosChamados] = useState([])
    const [usuario, setUsuario] = useState(null)
    const [filtrosMeus, setFiltrosMeus] = useState({
        status: '',
        prioridade: '',
        categoria: '',
    })
    const [filtrosTodos, setFiltrosTodos] = useState({
        status: '',
        prioridade: '',
        categoria: '',
    })

    async function fetchDados() {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        const authHeaders = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            const [resPerfil, resMeus] = await Promise.all([
                axios.get('http://localhost:3000/perfil', authHeaders),
                axios.get('http://localhost:3000/solicitante', authHeaders),
            ])

            const user = resPerfil.data.response?.usuario
            if (user) {
                setUsuario(user)
            }

            const listaMeus = resMeus.data.response?.chamados
            if (Array.isArray(listaMeus)) {
                setMeusChamados(listaMeus)
            }

            const perfilTecnico =
                user?.tipo_perfil?.toLowerCase() === 'técnico' ||
                user?.tipo_perfil?.toLowerCase() === 'tecnico'

            if (perfilTecnico) {
                const resTodos = await axios.get('http://localhost:3000/chamados', authHeaders)
                const listaTodos = resTodos.data.response?.chamados
                if (Array.isArray(listaTodos)) {
                    setTodosChamados(listaTodos)
                }
            }
        } catch (err) {
            console.error('Erro ao carregar dados:', err)
            if (err.response?.status === 401) {
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        fetchDados()
    }, [])

    function handleFiltroMeusChange(campo, valor) {
        setFiltrosMeus((prev) => ({
            ...prev,
            [campo]: valor,
        }))
    }

    function handleFiltroTodosChange(campo, valor) {
        setFiltrosTodos((prev) => ({
            ...prev,
            [campo]: valor,
        }))
    }

    const isTecnico =
        usuario?.tipo_perfil?.toLowerCase() === 'técnico' ||
        usuario?.tipo_perfil?.toLowerCase() === 'tecnico'

    const meusChamadosFiltrados = aplicarFiltros(meusChamados, filtrosMeus)
    const todosChamadosFiltrados = aplicarFiltros(todosChamados, filtrosTodos)

    const baseDashboard = isTecnico ? todosChamados : meusChamados
    const abertos = baseDashboard.filter(
        (c) => c.status?.toLowerCase() !== 'fechado' && c.status?.toLowerCase() !== 'resolvido'
    ).length
    const fechados = baseDashboard.filter(
        (c) => c.status?.toLowerCase() === 'fechado' || c.status?.toLowerCase() === 'resolvido'
    ).length

    const dadosDashboard = [
        { valor: abertos, label: 'Abertos' },
        { valor: fechados, label: 'Fechados' },
        { valor: baseDashboard.length, label: 'Total' },
    ]

    return (
        <>
            <Header />
            <Dashboard dados={dadosDashboard} />
            <div className={styles.chamadosContainer}>
                <div className={styles.chamadosHeader}>
                    <h3>Meus Chamados</h3>
                    <FiltrosChamados
                        filtros={filtrosMeus}
                        onFilterChange={handleFiltroMeusChange}
                    />
                </div>
                <TabelaChamados chamados={meusChamadosFiltrados} />
                <button>Criar Chamado</button>
            </div>

            {isTecnico && (
                <div className={styles.chamadosContainer}>
                    <div className={styles.line}></div>
                    <div className={styles.chamadosHeader}>
                        <h3>Todos os Chamados</h3>
                        <FiltrosChamados
                            filtros={filtrosTodos}
                            onFilterChange={handleFiltroTodosChange}
                        />
                    </div>
                    <TabelaChamados chamados={todosChamadosFiltrados} />
                </div>
            )}
        </>
    )
}
