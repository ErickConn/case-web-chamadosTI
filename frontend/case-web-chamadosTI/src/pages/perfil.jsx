import styles from './perfil.module.css';
import Header from '../components/header';
import axios from 'axios';
import { useState, useEffect } from 'react';


export default function Perfil() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [tipo, setTipo] = useState('');

    async function fetchPerfil() {
        try {
            const res = await axios.get('http://localhost:3000/perfil', {
                params: {
                    id: 1
                }
            });
            const usuario = res.data.response?.usuario;
            if (usuario) {
                setNome(usuario.nome || '');
                setEmail(usuario.email || '');
                setCargo(usuario.cargo || '');
                setTipo(usuario.tipo_perfil || '');
            }
        } catch (err) {
            console.error("Erro ao carregar perfil:", err);
        }
    }

    useEffect(() => {
        fetchPerfil();
    }, []);

    return (
        <div>
            <Header></Header>
            <div className={styles.bodyContainer}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileImageContainer}>
                        <div className={styles.image}>
                            <img src='/logo.png'></img>
                        </div>
                    </div>
                    <div className={styles.profileInfoContainer}>
                        <h2>Informações</h2>
                        <p><a>Nome: </a><span>{nome}</span></p>
                        <p><a>Email: </a><span>{email}</span></p>
                        <p><a>Cargo: </a><span>{cargo}</span></p>
                        <p><a>Tipo de Perfil: </a><span>{tipo}</span></p>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.deleteButton}>Excluir Perfil</button>
                    <button className={styles.updateButton}>Atualizar Perfil</button>
                </div>
            </div>
        </div >
    )
}
