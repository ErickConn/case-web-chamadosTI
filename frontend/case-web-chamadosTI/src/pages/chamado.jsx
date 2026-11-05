import { useState } from "react"
import Header from "../components/header"
import SolucaoModal from "../components/solucaoModal"
import styles from "./chamado.module.css"
import { useNavigate } from "react-router-dom"

export default function Chamado() {
    const navigate = useNavigate();
    const [nota, setNota] = useState(5);
    const [hoverNota, setHoverNota] = useState(0);
    const [marcarResolvido, setMarcarResolvido] = useState(false);
    const [modalSolucao, setModalSolucao] = useState({
        aberto: false,
        tipo: "aceitar",
    });

    function abrirModalSolucao(tipo) {
        setModalSolucao({ aberto: true, tipo });
    }

    function fecharModalSolucao() {
        setModalSolucao((prev) => ({ ...prev, aberto: false }));
    }

    function handleConfirmarSolucao(tipo) {
        if (tipo === "resolvido") {
            setMarcarResolvido(true);
        }
        fecharModalSolucao();
    }

    function handleCheckResolvido(e) {
        if (e.target.checked) {
            abrirModalSolucao("resolvido");
        } else {
            setMarcarResolvido(false);
        }
    }

    return (
        <>
            <Header />
            <div className={styles.chamadoHeader}>
                <span className={styles.closeBtn} onClick={() => navigate(-1)}>X</span>
                <div className={styles.headerInfo}>
                    <h3>Informações do Chamado</h3>
                    <div className={styles.headerDetails}>
                        <p>Id: 2031 / Título: Computador não liga / Categoria: Hardware / Prioridade: Alta</p>
                        <p>Status: Resolvido</p>
                        <p>Solicitante: Maria</p>
                        <p>Técnico: João</p>
                    </div>
                </div>
            </div>
            <div className={styles.chamadoBody}>
                <div className={styles.secaoMensagem}>
                    <h5>Descrição: </h5>
                    <div className={styles.messageContainer}>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, assumenda earum,
                            recusandae autem nobis quos laborum error accusamus ut molestiae ipsa in laudantium ipsum rerum!
                            Animi fugiat odit autem impedit!</p>
                    </div>
                </div>
                <div className={styles.secaoMensagem}>
                    <h5>João: </h5>
                    <div className={styles.messageContainer}>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, assumenda earum,
                            recusandae autem nobis quos laborum error accusamus ut molestiae ipsa in laudantium ipsum rerum!
                            Animi fugiat odit autem impedit!</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button
                            type="button"
                            className={styles.buttonAceitar}
                            onClick={() => abrirModalSolucao("aceitar")}
                        >
                            Aceitar Solução
                        </button>
                        <button
                            type="button"
                            className={styles.buttonRejeitar}
                            onClick={() => abrirModalSolucao("rejeitar")}
                        >
                            Rejeitar Solução
                        </button>
                    </div>
                </div>
                <div className={styles.secaoMensagem}>
                    <h5>Maria: </h5>
                    <div className={styles.messageContainer}>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, assumenda earum,
                            recusandae autem nobis quos laborum error accusamus ut molestiae ipsa in laudantium ipsum rerum!
                            Animi fugiat odit autem impedit!</p>
                    </div>
                    <div className={styles.notaContainer}>
                        <h5>Nota:</h5>
                        <div className={styles.estrelas}>
                            {[1, 2, 3, 4, 5].map((estrela) => {
                                const ativa = estrela <= (hoverNota || nota);
                                return (
                                    <span
                                        key={estrela}
                                        className={`${styles.estrela} ${ativa ? styles.estrelaAtiva : ""}`}
                                        onClick={() => setNota(estrela)}
                                        onMouseEnter={() => setHoverNota(estrela)}
                                        onMouseLeave={() => setHoverNota(0)}
                                    >
                                        ★
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.inputContainer}>
                <input placeholder="Digite sua mensagem" className={styles.inputMessage} />
                <div className={styles.subContainer}>
                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            id="resolvidoCheck"
                            checked={marcarResolvido}
                            onChange={handleCheckResolvido}
                        />
                        <label htmlFor="resolvidoCheck">Marcar como resolvido</label>
                    </div>
                    <button type="button" className={styles.buttonEnviar}>Enviar</button>
                </div>
            </div>

            <SolucaoModal
                isOpen={modalSolucao.aberto}
                tipo={modalSolucao.tipo}
                onClose={fecharModalSolucao}
                onConfirm={handleConfirmarSolucao}
            />
        </>
    )
}
