import { useEffect } from 'react';
import styles from './solucaoModal.module.css';

export default function SolucaoModal({
    isOpen,
    tipo = 'aceitar',
    onClose,
    onConfirm,
}) {
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const configPorTipo = {
        aceitar: {
            titulo: 'Aceitar Solução',
            botaoTexto: 'Aceitar',
            botaoClasse: styles.confirmButton,
            mensagem: (
                <>
                    Tem certeza de que deseja <strong>aceitar a solução</strong> proposta pelo técnico? O chamado será marcado como <strong>fechado</strong>.
                </>
            ),
        },
        rejeitar: {
            titulo: 'Rejeitar Solução',
            botaoTexto: 'Rejeitar',
            botaoClasse: styles.rejectButton,
            mensagem: (
                <>
                    Tem certeza de que deseja <strong className={styles.strongDanger}>rejeitar a solução</strong> proposta? O chamado continuará em atendimento para uma nova resposta.
                </>
            ),
        },
        resolvido: {
            titulo: 'Marcar como Resolvido',
            botaoTexto: 'Confirmar',
            botaoClasse: styles.confirmButton,
            mensagem: (
                <>
                    Tem certeza de que deseja marcar este chamado como <strong>resolvido</strong>? O solicitante poderá avaliar e aceitar ou rejeitar a solução.
                </>
            ),
        },
    };

    const config = configPorTipo[tipo] || configPorTipo.aceitar;

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
                onClick={onClose}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`modal-content shadow ${styles.modalContent}`}>
                        <div className="modal-header border-bottom-0 pb-0">
                            <h5 className={`modal-title ${styles.modalTitle}`}>
                                {config.titulo}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Fechar"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body py-4 fs-5">
                            <p className={`mb-0 ${styles.modalText}`}>
                                {config.mensagem}
                            </p>
                        </div>

                        <div className="modal-footer justify-content-center border-top-0 gap-3 pb-4">
                            <button
                                type="button"
                                className={`btn ${styles.cancelButton}`}
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className={`btn ${config.botaoClasse}`}
                                onClick={() => onConfirm?.(tipo)}
                            >
                                {config.botaoTexto}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}
