import { useState, useEffect } from 'react';
import { uploadImagemCloudinary } from '../services/cloudinary';
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
    const [foto, setFoto] = useState('');
    const [enviandoFoto, setEnviandoFoto] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNome(usuarioAtual.nome || '');
            setEmail(usuarioAtual.email || '');
            setCargo(usuarioAtual.cargo || '');
            setTipo(usuarioAtual.tipo || 'solicitante');
            setFoto(usuarioAtual.foto || '');
            setErro('');
            setCarregando(false);
            setEnviandoFoto(false);
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

    async function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setEnviandoFoto(true);
        setErro('');

        try {
            const url = await uploadImagemCloudinary(file);
            setFoto(url);
        } catch (err) {
            setErro(err.message || 'Erro ao enviar imagem para a CDN.');
        } finally {
            setEnviandoFoto(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setCarregando(true);
        setErro('');

        try {
            await onSave({
                nome,
                email,
                cargo,
                tipo_perfil: tipo,
                foto: foto || null
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

                                    <div className="col-md-6">
                                        <label htmlFor="inputFotoArquivo" className="form-label fw-semibold">
                                            Enviar Foto (Cloudinary CDN)
                                        </label>
                                        <input
                                            type="file"
                                            id="inputFotoArquivo"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={enviandoFoto}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputFotoUrl" className="form-label fw-semibold">
                                            Link da Foto (URL)
                                        </label>
                                        <input
                                            type="url"
                                            id="inputFotoUrl"
                                            className="form-control"
                                            value={foto}
                                            onChange={(e) => setFoto(e.target.value)}
                                            placeholder="https://res.cloudinary.com/..."
                                        />
                                    </div>

                                    {foto && (
                                        <div className="col-12 d-flex align-items-center gap-3 mt-2">
                                            <img
                                                src={foto}
                                                alt="Pré-visualização da foto"
                                                className={styles.previewImage}
                                            />
                                            <span className={styles.previewText}>
                                                {enviandoFoto ? 'Enviando imagem para o Cloudinary...' : 'Pré-visualização da foto'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="modal-footer justify-content-center border-top-0 gap-3 pb-4">
                                <button
                                    type="button"
                                    className={`btn ${styles.cancelButton}`}
                                    onClick={onClose}
                                    disabled={carregando || enviandoFoto}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={`btn ${styles.saveButton}`}
                                    disabled={carregando || enviandoFoto}
                                >
                                    {enviandoFoto
                                        ? 'Enviando foto...'
                                        : carregando
                                        ? 'Salvando...'
                                        : 'Salvar Alterações'}
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
