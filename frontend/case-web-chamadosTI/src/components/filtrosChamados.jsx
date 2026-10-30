import styles from './filtrosChamados.module.css'

export default function FiltrosChamados({ filtros = {}, onFilterChange }) {
    return (
        <div className={styles.filtros}>
            <span>Filtrar por: </span>
            <select
                className={styles.filtro}
                name='status'
                id='status'
                value={filtros.status || ''}
                onChange={(e) => onFilterChange?.('status', e.target.value)}
            >
                <option value=''>Status (Todos)</option>
                <option value='aberto'>Aberto</option>
                <option value='aguardando resposta'>Aguardando Resposta</option>
                <option value='resolvido'>Resolvido</option>
                <option value='fechado'>Fechado</option>
            </select>
            <select
                className={styles.filtro}
                name='prioridade'
                id='prioridade'
                value={filtros.prioridade || ''}
                onChange={(e) => onFilterChange?.('prioridade', e.target.value)}
            >
                <option value=''>Prioridade (Todas)</option>
                <option value='urgente'>Urgente</option>
                <option value='alta'>Alta</option>
                <option value='média'>Média</option>
                <option value='baixa'>Baixa</option>
            </select>
            <select
                className={styles.filtro}
                name='categoria'
                id='categoria'
                value={filtros.categoria || ''}
                onChange={(e) => onFilterChange?.('categoria', e.target.value)}
            >
                <option value=''>Categoria (Todas)</option>
                <option value='Hardware'>Hardware</option>
                <option value='Software'>Software</option>
                <option value='Acesso'>Acesso</option>
                <option value='Rede'>Rede</option>
            </select>
        </div>
    )
}
