import Header from '../components/header'
import Dashboard from '../components/dashboard'
import FiltrosChamados from '../components/filtrosChamados'
import TabelaChamados from '../components/tabelaChamados'
import styles from './solicitante.module.css'

const dadosDashboard = [
    { valor: 3, label: 'Abertos' },
    { valor: 2, label: 'Fechados' },
    { valor: 5, label: 'Total' },
]

const listaChamados = [
    {
        id: '#1024',
        titulo: 'Computador não liga',
        categoria: 'Hardware',
        prioridade: 'Alta',
        status: 'Em atendimento',
    },
]

export default function Solicitante() {
    return (
        <>
            <Header />
            <Dashboard dados={dadosDashboard} />
            <div className={styles.chamadosContainer}>
                <div className={styles.chamadosHeader}>
                    <h3>Meus Chamados</h3>
                    <FiltrosChamados />
                </div>
                <TabelaChamados chamados={listaChamados} />
                <button>Criar Chamado</button>
            </div>
        </>
    )
}
