import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Header from "../components/header"
import SolucaoModal from "../components/solucaoModal"
import UpdateChamadoModal from "../components/updateChamadoModal"
import DeleteChamadoModal from "../components/deleteChamadoModal"
import Feedback from "../components/feedback"
import styles from "./chamado.module.css"

export default function Chamado() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [chamado, setChamado] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [nota, setNota] = useState(0);
    const [hoverNota, setHoverNota] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [marcarResolvido, setMarcarResolvido] = useState(false);
    const [updateModalAberto, setUpdateModalAberto] = useState(false);
    const [deleteModalAberto, setDeleteModalAberto] = useState(false);
    const [modalSolucao, setModalSolucao] = useState({
        aberto: false,
        tipo: "aceitar",
        solucaoId: null,
    });

    async function fetchChamado() {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const authHeaders = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const resPerfil = await axios.get("http://localhost:3000/perfil", authHeaders);
            const user = resPerfil.data.response?.usuario;
            if (user) {
                setUsuario(user);
            }

            if (id) {
                const resChamado = await axios.get(`http://localhost:3000/chamados/${id}`, authHeaders);
                const dadosChamado = resChamado.data.response?.chamado;
                if (dadosChamado) {
                    setChamado(dadosChamado);
                    setNota(dadosChamado.nota != null ? Number(dadosChamado.nota) : 0);
                }
            }
        } catch (err) {
            console.error("Erro ao carregar chamado:", err);
            if (err.response?.status === 401) {
                navigate("/login");
            }
        }
    }

    useEffect(() => {
        fetchChamado();
    }, [id]);

    function abrirModalSolucao(tipo, solucaoId = null) {
        setModalSolucao({ aberto: true, tipo, solucaoId });
    }

    function fecharModalSolucao() {
        setModalSolucao((prev) => ({ ...prev, aberto: false }));
    }

    async function handleAtualizarChamado(dadosAtualizados) {
        const token = localStorage.getItem("token");
        const res = await axios.put(
            `http://localhost:3000/chamados/${chamado.id}`,
            dadosAtualizados,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const chamadoAtualizado = res.data.response?.chamado;
        if (chamadoAtualizado) {
            setChamado(chamadoAtualizado);
        } else {
            fetchChamado();
        }
    }

    async function handleExcluirChamado() {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/chamados/${chamado.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeleteModalAberto(false);
            navigate("/");
        } catch (err) {
            console.error("Erro ao excluir chamado:", err);
            setFeedback({
                tipo: "erro",
                mensagem: err.response?.data?.response?.message || "Erro ao excluir chamado."
            });
            setDeleteModalAberto(false);
        }
    }

    const statusChamado = chamado?.status?.toLowerCase();
    const podeAvaliarSolucao = statusChamado === "resolvido" || statusChamado === "fechado";

    async function handleSelecionarNota(estrela, avaliacaoId = null, solucaoId = null) {
        if (!podeAvaliarSolucao || !chamado?.id) return;

        setNota(estrela);

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:3000/chamados/${chamado.id}/nota`,
                {
                    nota: estrela,
                    avaliacaoId,
                    solucaoId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchChamado();
        } catch (err) {
            console.error("Erro ao salvar nota:", err);
            setFeedback({
                tipo: "erro",
                mensagem: err.response?.data?.response?.message || "Erro ao salvar a avaliação."
            });
        }
    }

    async function handleConfirmarSolucao(tipo) {
        if (tipo === "resolvido") {
            setMarcarResolvido(true);
            fecharModalSolucao();
            return;
        }

        if ((tipo === "aceitar" || tipo === "rejeitar") && modalSolucao.solucaoId && chamado?.id) {
            try {
                const token = localStorage.getItem("token");
                await axios.put(
                    `http://localhost:3000/chamados/${chamado.id}/solucao/${modalSolucao.solucaoId}`,
                    { acao: tipo },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (tipo === "rejeitar") {
                    setNota(0);
                }
                fecharModalSolucao();
                fetchChamado();
            } catch (err) {
                console.error("Erro ao responder solução:", err);
                setFeedback({
                    tipo: "erro",
                    mensagem: err.response?.data?.response?.message || "Erro ao responder solução."
                });
                fecharModalSolucao();
            }
        } else {
            fecharModalSolucao();
        }
    }

    function handleCheckResolvido(e) {
        if (e.target.checked) {
            abrirModalSolucao("resolvido");
        } else {
            setMarcarResolvido(false);
        }
    }

    const isTecnicoDoChamado =
        usuario &&
        chamado &&
        (Number(chamado.tecnicoId) === Number(usuario.id) ||
            usuario.tipo_perfil?.toLowerCase() === "técnico" ||
            usuario.tipo_perfil?.toLowerCase() === "tecnico");

    const isSolicitanteDoChamado =
        usuario &&
        chamado &&
        Number(chamado.userId) === Number(usuario.id);

    async function handleEnviarMensagem() {
        if (!mensagem.trim() || !chamado?.id) return;

        const token = localStorage.getItem("token");
        const authHeaders = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            if (isTecnicoDoChamado && Number(chamado.userId) !== Number(usuario?.id)) {
                await axios.post(
                    `http://localhost:3000/chamados/${chamado.id}/solucao`,
                    {
                        descricao: mensagem,
                        marcarResolvido,
                    },
                    authHeaders
                );
            } else {
                await axios.post(
                    `http://localhost:3000/chamados/${chamado.id}/avaliacao`,
                    {
                        comentario: mensagem,
                        nota: podeAvaliarSolucao ? (nota || null) : null,
                    },
                    authHeaders
                );
            }

            setMensagem("");
            setMarcarResolvido(false);
            fetchChamado();
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
            setFeedback({
                tipo: "erro",
                mensagem: err.response?.data?.response?.message || "Não foi possível enviar a mensagem."
            });
        }
    }

    const solucoes = chamado?.solucoes || [];
    const ultimaSolucaoId = solucoes.length > 0 ? solucoes[solucoes.length - 1].id : null;

    return (
        <div className={styles.pageContainer}>
            <Header />
            <Feedback
                tipo={feedback?.tipo}
                mensagem={feedback?.mensagem}
                onClose={() => setFeedback(null)}
            />
            <div className={styles.chamadoHeader}>
                <span className={styles.closeBtn} onClick={() => navigate(-1)}>X</span>
                <div className={styles.headerInfo}>
                    <div className={styles.headerTopRow}>
                        <h3>Informações do Chamado</h3>
                        {isSolicitanteDoChamado && statusChamado !== "fechado" && (
                            <div className={styles.headerActions}>
                                <button
                                    type="button"
                                    className={styles.buttonEditarChamado}
                                    onClick={() => setUpdateModalAberto(true)}
                                >
                                    Editar Chamado
                                </button>
                                <button
                                    type="button"
                                    className={styles.buttonExcluirChamado}
                                    onClick={() => setDeleteModalAberto(true)}
                                >
                                    Excluir Chamado
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles.headerDetails}>
                        <p>
                            Id: {chamado ? `#${chamado.id}` : "..."} / Título: {chamado?.titulo || "..."} / Categoria: {chamado?.categoria || "..."} / Prioridade: {chamado?.prioridade || "..."}
                        </p>
                        <p>Status: {chamado?.status || "..."}</p>
                        <p>Solicitante: {chamado?.solicitanteNome || "Não informado"}</p>
                        <p>Técnico: {chamado?.tecnicoNome || "Aguardando atribuição"}</p>
                    </div>
                </div>
            </div>

            <div className={styles.chamadoBody}>
                <div className={styles.secaoMensagem}>
                    <h5>Descrição: </h5>
                    <div className={styles.messageContainer}>
                        <p>{chamado?.descricao || "Sem descrição informada."}</p>
                    </div>
                </div>

                {solucoes.map((solucao, index) => {
                    const proximaSolucao = solucoes[index + 1];
                    const isAceita =
                        solucao.status === "aceita" ||
                        (statusChamado === "fechado" && solucao.status !== "rejeitada");
                    const isRejeitada = solucao.status === "rejeitada";
                    const isUltimaDoBlocoStatus =
                        !proximaSolucao || proximaSolucao.status !== solucao.status;

                    return (
                        <div key={solucao.id} className={styles.secaoMensagem}>
                            <h5>{chamado?.tecnicoNome || "Técnico"}: </h5>
                            <div
                                className={`${styles.messageContainer} ${
                                    isRejeitada
                                        ? styles.messageRejeitada
                                        : isAceita
                                        ? styles.messageAceita
                                        : ""
                                }`}
                            >
                                <p>{solucao.descricao}</p>
                            </div>

                            {isRejeitada && isUltimaDoBlocoStatus && (
                                <span className={styles.feedbackRejeitado}>
                                    Solução rejeitada pelo solicitante — aguardando nova solução
                                </span>
                            )}

                            {isAceita && solucao.id === ultimaSolucaoId && (
                                <span className={styles.feedbackAceito}>
                                    Solução aceita pelo solicitante
                                </span>
                            )}

                            {isSolicitanteDoChamado &&
                                statusChamado === "resolvido" &&
                                solucao.id === ultimaSolucaoId &&
                                solucao.status === "aguardando resposta" && (
                                    <div className={styles.buttonContainer}>
                                        <button
                                            type="button"
                                            className={styles.buttonAceitar}
                                            onClick={() => abrirModalSolucao("aceitar", solucao.id)}
                                        >
                                            Aceitar Solução
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.buttonRejeitar}
                                            onClick={() => abrirModalSolucao("rejeitar", solucao.id)}
                                        >
                                            Rejeitar Solução
                                        </button>
                                    </div>
                                )}

                            {solucao.avaliacoes
                                ?.filter((av) => av.comentario && av.comentario.trim() !== "")
                                .map((av) => (
                                    <div key={av.id} className={styles.secaoMensagem} style={{ marginTop: "16px" }}>
                                        <h5>{chamado?.solicitanteNome || "Solicitante"}: </h5>
                                        <div className={styles.messageContainer}>
                                            <p>{av.comentario}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    );
                })}

                {solucoes.length > 0 && podeAvaliarSolucao && (
                    <div className={styles.notaContainer}>
                        <h5>Nota:</h5>
                        <div className={styles.estrelas}>
                            {[1, 2, 3, 4, 5].map((estrela) => {
                                const ativa = estrela <= (hoverNota || nota);
                                return (
                                    <span
                                        key={estrela}
                                        className={`${styles.estrela} ${ativa ? styles.estrelaAtiva : ""}`}
                                        onClick={() => {
                                            if (isSolicitanteDoChamado) {
                                                handleSelecionarNota(estrela);
                                            }
                                        }}
                                        onMouseEnter={() => {
                                            if (isSolicitanteDoChamado) {
                                                setHoverNota(estrela);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (isSolicitanteDoChamado) {
                                                setHoverNota(0);
                                            }
                                        }}
                                    >
                                        ★
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {statusChamado !== "fechado" &&
                ((isTecnicoDoChamado && Number(chamado?.userId) !== Number(usuario?.id)) ||
                    (isSolicitanteDoChamado && statusChamado === "resolvido")) && (
                <div className={styles.inputContainer}>
                    <input
                        placeholder="Digite sua mensagem"
                        className={styles.inputMessage}
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                    />
                    <div className={styles.subContainer}>
                        {isTecnicoDoChamado && Number(chamado?.userId) !== Number(usuario?.id) && (
                            <div className={styles.checkBox}>
                                <input
                                    type="checkbox"
                                    id="resolvidoCheck"
                                    checked={marcarResolvido}
                                    onChange={handleCheckResolvido}
                                />
                                <label htmlFor="resolvidoCheck">Marcar como resolvido</label>
                            </div>
                        )}
                        <button
                            type="button"
                            className={styles.buttonEnviar}
                            onClick={handleEnviarMensagem}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}

            <SolucaoModal
                isOpen={modalSolucao.aberto}
                tipo={modalSolucao.tipo}
                onClose={fecharModalSolucao}
                onConfirm={handleConfirmarSolucao}
            />

            <UpdateChamadoModal
                isOpen={updateModalAberto}
                onClose={() => setUpdateModalAberto(false)}
                chamadoAtual={chamado}
                onSave={handleAtualizarChamado}
            />

            <DeleteChamadoModal
                isOpen={deleteModalAberto}
                onClose={() => setDeleteModalAberto(false)}
                onConfirm={handleExcluirChamado}
                chamado={chamado}
            />
        </div>
    )
}
