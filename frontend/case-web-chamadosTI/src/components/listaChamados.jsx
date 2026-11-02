import styles from './listaChamados.module.css'

export default function ListaChamados({ chamados = [], onAssumirChamado }) {
    return (
        <table className={styles.chamadosTable}>
            <thead>
                <tr className={styles.tableAtributos}>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Técnico</th>
                </tr>
            </thead>
            <tbody>
                {chamados.map((chamado) => (
                    <tr key={chamado.id} className={styles.tableData}>
                        <td>{String(chamado.id).startsWith('#') ? chamado.id : `#${chamado.id}`}</td>
                        <td>{chamado.titulo}</td>
                        <td>{chamado.categoria}</td>
                        <td>{chamado.prioridade}</td>
                        <td>{chamado.status}</td>
                        <td
                            className={styles.assumirChamado}
                            onClick={() => onAssumirChamado?.(chamado)}
                        >
                            [assumir chamado]
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
