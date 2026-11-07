import { useEffect } from 'react';
import styles from './delete.module.css';

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    nome
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
                                Confirmar Exclusão
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Fechar"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body py-4 fs-5">
                            <p className="mb-0">
                                Tem certeza de que deseja excluir o perfil de <strong>{nome || 'este usuário'}</strong>? Esta ação não pode ser desfeita.
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
                            {onConfirm && (
                                <button
                                    type="button"
                                    className={`btn ${styles.deleteButton}`}
                                    onClick={onConfirm}
                                >
                                    Excluir
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}