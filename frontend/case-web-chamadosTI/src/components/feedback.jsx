import { useEffect } from 'react'
import styles from './feedback.module.css'

export default function Feedback({ mensagem, tipo = 'info', onClose, duracao = 8000 }) {
    useEffect(() => {
        if (!mensagem || !duracao || !onClose) return undefined

        const timeoutId = window.setTimeout(onClose, duracao)
        return () => window.clearTimeout(timeoutId)
    }, [mensagem, duracao, onClose])

    if (!mensagem) return null

    const tipoValido = ['erro', 'sucesso', 'info'].includes(tipo) ? tipo : 'info'
    const role = tipoValido === 'erro' ? 'alert' : 'status'

    return (
        <div
            className={`${styles.feedback} ${styles[tipoValido]}`}
            role={role}
            aria-live={tipoValido === 'erro' ? 'assertive' : 'polite'}
        >
            <span className={styles.mensagem}>{mensagem}</span>
            {onClose && (
                <button
                    type="button"
                    className={styles.fechar}
                    onClick={onClose}
                    aria-label="Fechar mensagem"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            )}
        </div>
    )
}
