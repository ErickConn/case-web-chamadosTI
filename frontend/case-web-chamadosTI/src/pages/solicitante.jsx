import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/header'
import Dashboard from '../components/dashboard'
import FiltrosChamados from '../components/filtrosChamados'
import TabelaChamados from '../components/tabelaChamados'
import styles from './solicitante.module.css'

export default function Solicitante() {
    const [chamados, setChamados] = useState([])
    const [filtros, setFiltros] = useState({
        status: '',
        prioridade: '',
        categoria: '',
    })

    async function fetchChamados() {
        try {
            const res = await axios.get('http://localhost:3000/solicitante')
            const lista = res.data.response?.chamados
            if (Array.isArray(lista)) {
                setChamados(lista)
            }
        } catch (err) {
            console.error('Erro ao carregar chamados:', err)
        }
    }

    useEffect(() => {
        fetchChamados()
    }, [])

    function handleFilterChange(campo, valor) {
        setFiltros((prev) => ({
            ...prev,
            [campo]: valor,
        }))
    }

    const chamadosFiltrados = chamados.filter((chamado) => {
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

    const abertos = chamados.filter(
        (c) => c.status?.toLowerCase() !== 'fechado' && c.status?.toLowerCase() !== 'resolvido'
    ).length
    const fechados = chamados.filter(
        (c) => c.status?.toLowerCase() === 'fechado' || c.status?.toLowerCase() === 'resolvido'
    ).length

    const dadosDashboard = [
        { valor: abertos, label: 'Abertos' },
        { valor: fechados, label: 'Fechados' },
        { valor: chamados.length, label: 'Total' },
    ]

    return (
        <>
            <Header />
            <Dashboard dados={dadosDashboard} />
            <div className={styles.chamadosContainer}>
                <div className={styles.chamadosHeader}>
                    <h3>Meus Chamados</h3>
                    <FiltrosChamados
                        filtros={filtros}
                        onFilterChange={handleFilterChange}
                    />
                </div>
                <TabelaChamados chamados={chamadosFiltrados} />
                <button>Criar Chamado</button>
            </div>
        </>
    )
}
