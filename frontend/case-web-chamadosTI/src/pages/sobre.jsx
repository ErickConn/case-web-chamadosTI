import styles from './sobre.module.css';
import Header from '../components/header';


export default function Sobre() {
    // Informações sobre a equipe, foto serão adicionadas posteriormente
    const equipe = [
        {
            nome: 'Nome do integrante 1',
            cargo: 'Desenvolvedor',
            foto: ''
        },
        {
            nome: 'Nome do integrante 2',
            cargo: 'Analista de Sistemas',
            foto: ''
        },
        {
            nome: 'Nome do integrante 3',
            cargo: 'Suporte de TI',
            foto: ''
        },
        {
            nome: 'Nome do integrante 4',
            cargo: 'Financeiro',
            foto: ''
        }
    ];



    return (
        <div>
            <Header />
            <div className={styles.bodyContainer}>
                <section className={styles.sobreContainer}>
                    <div className={styles.sobreTexto}>
                        <h1>Sobre a nossa marca</h1>
                        <p>
                            Nossa plataforma foi desenvolvida para
                            facilitar a comunicação entre usuários
                            e a equipe de Tecnologia da Informação.
                        </p>
                        <p>
                            Por meio do sistema de chamados, é possível
                            registrar problemas técnicos, acompanhar
                            solicitações e tornar o atendimento mais
                            organizado, ágil e eficiente.
                        </p>
                        <p>
                            Nosso compromisso é transformar dificuldades
                            tecnológicas em soluções, proporcionando
                            uma experiência simples e acessível para todos.
                        </p>
                        <p>
                            Acreditamos que a tecnologia deve facilitar o dia a dia.
                            Por isso, nossa plataforma tem como objetivo centralizar
                            solicitações de suporte técnico em um ambiente organizado
                            e acessível.
                        </p>
                        <p>
                            Através do sistema de chamados, os usuários podem registrar
                            problemas relacionados à tecnologia da informação,
                            facilitando a comunicação com a equipe responsável e
                            contribuindo para um atendimento mais eficiente.
                        </p>
                    </div>
                    <div className={styles.sobreDestaque}>
                        <img src="/logo.png" alt="Logo da HelpDesk" />
                        <h2>Tecnologia a serviço das pessoas.</h2>
                        <p>
                            Mais organização, comunicação e eficiência
                            para resolver problemas de TI.
                        </p>
                    </div>
                </section>
                <section className={styles.equipeContainer}>
                    <div className={styles.equipeTexto}>
                        <h1>Conheça nossa equipe</h1>
                        <p>
                            Estamos aqui para ajudar você a encontrar
                            soluções e manter tudo funcionando.
                        </p>
                    </div>
                    <div className={styles.equipeCards}>
                        {equipe.map((membro, index) => (
                            <div
                                className={styles.membroCard}
                                key={index}
                            >
                                <div className={styles.membroIcone}>
                                    {membro.foto ? (
                                        <img
                                            src={membro.foto}
                                            alt={`Foto de ${membro.nome}`}
                                        />
                                    ) : (
                                        <img
                                            src="/logo.png"
                                            alt={`Foto de ${membro.nome}`}
                                        />
                                    )}
                                </div>
                                <h3>{membro.nome}</h3>
                                <p>{membro.cargo}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.equipeTexto}>
                        <h2>Precisa de ajuda?</h2>
                        <p>
                            Encontrou algum problema ou precisa de
                            informações? Entre em contato com nossa
                            equipe para receber orientação.
                        </p>
                        <a
                            href="mailto:suporte@seudominio.com"
                            className={styles.contatoEmail}
                        >
                            suporte@seudominio.com
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
