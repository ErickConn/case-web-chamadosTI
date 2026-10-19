import { useState, useEffect } from 'react';
import styles from './updateModal.module.css';

export default function UpdateModal({
    isOpen,
    onClose,
    usuarioAtual = {},
    onSave
}) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [tipo, setTipo] = useState('solicitante');
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNome(usuarioAtual.nome || '');
            setEmail(usuarioAtual.email || '');
            setCargo(usuarioAtual.cargo || '');
            setTipo(usuarioAtual.tipo || 'solicitante');
            setErro('');
            setCarregando(false);
        }
    }, [isOpen, usuarioAtual]);

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

    async function handleSubmit(e) {
        e.preventDefault();
        setCarregando(true);
        setErro('');

        try {
            await onSave({
                nome,
                email,
                cargo,
                tipo_perfil: tipo
            });
            onClose();
        } catch (err) {
            setErro(err.response?.data?.message || err.message || 'Erro ao atualizar dados.');
        } finally {
            setCarregando(false);
        }
    }

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
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`modal-content shadow ${styles.modalContent}`}>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header border-bottom-0 pb-0">
                                <h5 className={`modal-title ${styles.modalTitle}`}>
                                    Atualizar Perfil
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Fechar"
                                    onClick={onClose}
                                ></button>
                            </div>

                            <div className="modal-body p-4">
                                {erro && (
                                    <div className="alert alert-danger py-2 mb-3" role="alert">
                                        {erro}
                                    </div>
                                )}

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="inputNome" className="form-label fw-semibold">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            id="inputNome"
                                            className="form-control"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            placeholder="Digite o nome completo"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail" className="form-label fw-semibold">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="inputEmail"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="exemplo@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputCargo" className="form-label fw-semibold">
                                            Cargo
                                        </label>
                                        <input
                                            type="text"
                                            id="inputCargo"
                                            className="form-control"
                                            value={cargo}
                                            onChange={(e) => setCargo(e.target.value)}
                                            placeholder="Ex: Desenvolvedor, Analista"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="selectTipo" className="form-label fw-semibold">
                                            Tipo de Perfil
                                        </label>
                                        <select
                                            id="selectTipo"
                                            className="form-select"
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                        >
                                            <option value="solicitante">Solicitante</option>
                                            <option value="técnico">Técnico</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer justify-content-center border-top-0 gap-3 pb-4">
                                <button
                                    type="button"
                                    className={`btn ${styles.cancelButton}`}
                                    onClick={onClose}
                                    disabled={carregando}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={`btn ${styles.saveButton}`}
                                    disabled={carregando}
                                >
                                    {carregando ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}
