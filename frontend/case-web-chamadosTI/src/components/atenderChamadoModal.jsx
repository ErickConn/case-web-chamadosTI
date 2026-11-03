import { useEffect } from 'react';
import styles from './atenderChamadoModal.module.css';

export default function AtenderChamadoModal({
    isOpen,
    onClose,
    onConfirm,
    chamado
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

    if (!isOpen || !chamado) return null;

    const idFormatado = String(chamado.id).startsWith('#')
        ? chamado.id
        : `#${chamado.id}`;

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
                                Atender Chamado
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
                                Deseja atribuir o chamado <strong>{idFormatado} - {chamado.titulo}</strong> a você?
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
                                className={`btn ${styles.confirmButton}`}
                                onClick={() => onConfirm?.(chamado)}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}

