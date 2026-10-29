import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/header'
import Dashboard from '../components/dashboard'
import FiltrosChamados from '../components/filtrosChamados'
import TabelaChamados from '../components/tabelaChamados'
import styles from './solicitante.module.css'

export default function Solicitante() {
    const [chamados, setChamados] = useState([])

    async function fetchChamados() {
        try {
            const res = await axios.get('http://localhost:3000/solicitante')
            const lista = res.data.response?.chamados
            setChamados(lista);
        } catch (err) {
            console.error('Erro ao carregar chamados:', err)
        }
    }

    useEffect(() => {
        fetchChamados()
    }, [])

    const abertos = chamados.filter(
        (c) => c.status?.toLowerCase() !== 'fechado' && c.status?.toLowerCase() !== 'resolvido'
    ).length
    const fechados = chamados.filter(
        (c) => c.status?.toLowerCase() === 'fechado' || c.status?.toLowerCase() == 'resolvido'
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
                    <FiltrosChamados />
                </div>
                <TabelaChamados chamados={chamados} />
                <button>Criar Chamado</button>
            </div>
        </>
    )
}
