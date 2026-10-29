import styles from './filtrosChamados.module.css'

export default function FiltrosChamados() {
    return (
        <div className={styles.filtros}>
            <span>Filtrar por: </span>
            <select
                className={styles.filtro}
                name='status'
                id='status'
            >
                <option value='atendimento'>Em atendimento</option>
                <option value='resolvido'>Resolvido</option>
                <option value='fechado'>Fechado</option>
            </select>
            <select
                className={styles.filtro}
                name='prioridade'
                id='prioridade'
            >
                <option value='alta'>Alta</option>
                <option value='média'>Média</option>
                <option value='baixa'>Baixa</option>
            </select>
            <select
                className={styles.filtro}
                name='categoria'
                id='categoria'
            >
                <option value='Hardware'>Hardware</option>
                <option value='Acesso'>Acesso</option>
                <option value='Rede'>Rede</option>
            </select>
        </div>
    )
}

