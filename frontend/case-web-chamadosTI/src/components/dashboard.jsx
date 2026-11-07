import styles from './dashboard.module.css'

export default function Dashboard({ dados = [] }) {
    return (
        <div className={styles.dashBoardContainer}>
            <h3>DashBoard</h3>
            <div className={styles.dashBoardBoxes}>
                {dados.map((item, index) => (
                    <div key={index} className={styles.dashBoardBox}>
                        <a>{item.valor} </a>
                        <a>{item.label}</a>
                    </div>
                ))}
            </div>
            <div className={styles.line}></div>
        </div>
    )
}

