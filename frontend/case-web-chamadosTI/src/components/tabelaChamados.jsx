import styles from './tabelaChamados.module.css'

export default function TabelaChamados({
    chamados = [],
    onConversar,
    tituloBotão = 'conversar',
    usuarioId,
}) {
    const isTabelaAtendimento = tituloBotão === 'atender chamado'

    return (
        <table className={styles.chamadosTable}>
            <thead>
                <tr className={styles.tableAtributos}>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Conversar</th>
                </tr>
            </thead>
            <tbody>
                {chamados.map((chamado) => {
                    const atribuidoAoUsuario =
                        isTabelaAtendimento &&
                        Boolean(chamado.tecnicoId) &&
                        Number(chamado.tecnicoId) === Number(usuarioId)

                    const atribuidoAOutro =
                        isTabelaAtendimento &&
                        Boolean(chamado.tecnicoId) &&
                        Number(chamado.tecnicoId) !== Number(usuarioId)

                    const textoBotao = atribuidoAoUsuario
                        ? 'conversar'
                        : atribuidoAOutro
                        ? 'indisponível'
                        : tituloBotão

                    return (
                        <tr key={chamado.id} className={styles.tableData}>
                            <td>{String(chamado.id).startsWith('#') ? chamado.id : `#${chamado.id}`}</td>
                            <td>{chamado.titulo}</td>
                            <td>{chamado.categoria}</td>
                            <td>{chamado.prioridade}</td>
                            <td>{chamado.status}</td>
                            <td
                                className={
                                    atribuidoAOutro
                                        ? styles.conversarDesabilitado
                                        : styles.conversar
                                }
                                onClick={() => {
                                    if (!atribuidoAOutro) {
                                        onConversar?.(chamado)
                                    }
                                }}
                            >
                                [{textoBotao}]
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
