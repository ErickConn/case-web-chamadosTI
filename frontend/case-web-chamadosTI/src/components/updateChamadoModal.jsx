import { useState, useEffect } from 'react';
import styles from './updateModal.module.css';

export default function UpdateChamadoModal({
    isOpen,
    onClose,
    chamadoAtual = {},
    onSave,
}) {
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('Hardware');
    const [prioridade, setPrioridade] = useState('baixa');
    const [descricao, setDescricao] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (isOpen && chamadoAtual) {
            const cat = chamadoAtual.categoria
                ? chamadoAtual.categoria.charAt(0).toUpperCase() + chamadoAtual.categoria.slice(1).toLowerCase()
                : 'Hardware';
            setTitulo(chamadoAtual.titulo || '');
            setCategoria(cat);
            setPrioridade(chamadoAtual.prioridade?.toLowerCase() || 'baixa');
            setDescricao(chamadoAtual.descricao || '');
            setErro('');
            setCarregando(false);
        }
    }, [isOpen, chamadoAtual]);

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
                titulo,
                categoria,
                prioridade,
                descricao,
            });
            onClose();
        } catch (err) {
            setErro(err.response?.data?.response?.message || err.message || 'Erro ao atualizar chamado.');
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
                                    Editar Chamado
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
                                    <div className="col-md-12">
                                        <label htmlFor="inputTituloChamado" className="form-label fw-semibold">
                                            Título
                                        </label>
                                        <input
                                            type="text"
                                            id="inputTituloChamado"
                                            className="form-control"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                            placeholder="Título do chamado"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="selectCategoriaChamado" className="form-label fw-semibold">
                                            Categoria
                                        </label>
                                        <select
                                            id="selectCategoriaChamado"
                                            className="form-select"
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                        >
                                            <option value="Hardware">Hardware</option>
                                            <option value="Software">Software</option>
                                            <option value="Rede">Rede</option>
                                            <option value="Acesso">Acesso</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="selectPrioridadeChamado" className="form-label fw-semibold">
                                            Prioridade
                                        </label>
                                        <select
                                            id="selectPrioridadeChamado"
                                            className="form-select"
                                            value={prioridade}
                                            onChange={(e) => setPrioridade(e.target.value)}
                                        >
                                            <option value="baixa">Baixa</option>
                                            <option value="média">Média</option>
                                            <option value="alta">Alta</option>
                                            <option value="urgente">Urgente</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="textareaDescricaoChamado" className="form-label fw-semibold">
                                            Descrição
                                        </label>
                                        <textarea
                                            id="textareaDescricaoChamado"
                                            className="form-control"
                                            rows="4"
                                            style={{
                                                fontFamily: "'Inria Serif', serif",
                                                fontSize: '16px',
                                                border: '1px solid #2CC0EC',
                                                borderRadius: '8px',
                                                color: '#0a3838',
                                            }}
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                            placeholder="Descreva o problema"
                                            required
                                        />
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

