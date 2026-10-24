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
                            Nossa plataforma foi criada para otimizar o suporte técnico dentro das empresas, 
                            conectando colaboradores e equipe de T.I. de forma simples e eficiente.
                        </p>
                        <p> 
                            Por meio do sistema de chamados, os usuários podem registrar problemas,
                            acompanhar o andamento das solicitações e interagir diretamente com os
                            técnicos responsáveis pela solução.
                        </p>
                        <p>
                            O objetivo é centralizar o atendimento em um ambiente organizado, garantindo 
                            agilidade, transparência e melhor comunicação entre solicitantes e técnicos.
                        </p>
                        <p>
                            Acreditamos que a tecnologia deve facilitar o trabalho e resolver desafios.
                            Por isso, nossa solução transforma dificuldades em oportunidades de melhoria,
                            tornando o suporte técnico mais rápido e acessível para todos.
                        </p>
                    </div>
                    <div className={styles.sobreDestaque}>
                        <img src="/logo.png" alt="Logotipo da HelpDesk" />
                        <h2>Tecnologia a serviço das pessoas.</h2>
                        <p>
                            Organização, comunicação e eficiência para transformar
                            desafios de TI em soluções rápidas e acessíveis.
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
                </section>
            </div>
        </div>
    );
}
