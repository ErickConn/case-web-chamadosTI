import styles from './perfil.module.css';
import Header from '../components/header';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DeleteModal from '../components/deleteModal';
import UpdateModal from '../components/updateModal';


export default function Perfil() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [tipo, setTipo] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [updateModalAberto, setUpdateModalAberto] = useState(false);

    async function fetchPerfil() {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:3000/perfil', {
                headers: {
                    Authorization: `Bearer ${token}`
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

    async function handleExcluirPerfil() {
        const token = localStorage.getItem('token');
        const res = await axios.delete('http://localhost:3000/perfil', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res);
        setModalAberto(false);
    }

    async function handleAtualizarPerfil(dadosAtualizados) {
        const token = localStorage.getItem('token');
        const res = await axios.put('http://localhost:3000/perfil', dadosAtualizados, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const usuarioAtualizado = res.data.response?.usuario;
        if (usuarioAtualizado) {
            setNome(usuarioAtualizado.nome);
            setEmail(usuarioAtualizado.email);
            setCargo(usuarioAtualizado.cargo);
            setTipo(usuarioAtualizado.tipo_perfil);
        }
    }

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
                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setModalAberto(true)}
                    >
                        Excluir Perfil
                    </button>
                    <button
                        type="button"
                        className={styles.updateButton}
                        onClick={() => setUpdateModalAberto(true)}
                    >
                        Atualizar Perfil
                    </button>
                </div>
            </div>

            <DeleteModal
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                onConfirm={handleExcluirPerfil}
                nome={nome}
            />

            <UpdateModal
                isOpen={updateModalAberto}
                onClose={() => setUpdateModalAberto(false)}
                usuarioAtual={{ nome, email, cargo, tipo }}
                onSave={handleAtualizarPerfil}
            />
        </div >
    )
}
