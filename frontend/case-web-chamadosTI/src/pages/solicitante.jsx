import Header from '../components/header'
import styles from './solicitante.module.css'


export default function Solicitante() {
    return (
        <>
            <Header></Header>
            <div className={styles.dashBoardContainer}>
                <h3>DashBoard</h3>
                <div className={styles.dashBoardBoxes}>
                    <div className={styles.dashBoardBox}>
                        <a>3 </a>
                        <a>Abertos</a>
                    </div>
                    <div className={styles.dashBoardBox}>
                        <a>2 </a>
                        <a>Fechados</a>
                    </div>
                    <div className={styles.dashBoardBox}>
                        <a>5 </a>
                        <a>Total</a>
                    </div>
                </div>
            </div>
            <div className={styles.chamadosContainer}>
                <div className={styles.chamadosHeader}>
                    <h3>Meus Chamados</h3>
                    <div className={styles.filtros}>
                        <span>Filtrar por: </span>
                        <select className={styles.filtro} name='status' id='status'>
                            <option value='atendimento'>Em atendimento</option>
                            <option value='resolvido'>Resolvido</option>
                            <option value='fechado'>Fechado</option>
                        </select>
                        <select className={styles.filtro} name='prioridade' id='prioridade'>
                            <option value='alta'>Alta</option>
                            <option value='média'>Média</option>
                            <option value='baixa'>Baixa</option>
                        </select>
                        <select className={styles.filtro} name='categoria' id='categoria'>
                            <option value='Hardware'>Hardware</option>
                            <option value='Acesso'>Acesso</option>
                            <option value='Rede'>Rede</option>
                        </select>
                    </div>
                </div>
                <table className={styles.chamadosTable}>
                    <tr className={styles.tableAtributos}>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Conversar</th>
                    </tr>
                    <tr className={styles.tableData}>
                        <td>#1024</td>
                        <td>Computador não liga</td>
                        <td>Hardware</td>
                        <td>Alta</td>
                        <td>Em atendimento</td>
                        <td>[conversar]</td>
                    </tr>
                </table>
                <button>Criar Chamado</button>
            </div >
        </>
    )
}