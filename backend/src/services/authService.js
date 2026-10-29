import 'dotenv/config';
import database from "../database/export.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;

async function register(data) {
    const { nome, email, senha, cargo, perfil } = data;

    if (!nome || !email || !senha || !perfil) {
        return { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos", data: null };
    }

    try {
        // Verifica se já existe usuário com esse email
        const existing = await database("usuario").where({ email }).first();
        if (existing) {
            return { status: 409, message: "Email já cadastrado", data: null };
        }

        // Criptografa a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Insere no banco
        const [id] = await database("usuario").insert({
            nome,
            email,
            senha: senhaHash,
            cargo,
            tipo_perfil: perfil
        });

        return { status: 201, message: "Usuário cadastrado com sucesso", usuario: { id, nome, email, cargo, perfil } };
    } catch (error) {
        console.error(error);
        return { status: 500, message: error.message || "Erro interno no servidor", data: null };
    }
}


async function login(data) {
    const { email, senha } = data;

    if (!email || !senha) {
        return { status: 400, message: "Email e senha são obrigatórios", data: null };
    }

    try {
        const usuario = await database("usuario").where({ email }).first();
        if (!usuario) {
            return { status: 404, message: "Usuário não encontrado", data: null };
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return { status: 401, message: "Senha incorreta", data: null };
        }

        // Gera token JWT
        const token = jwt.sign({ id: usuario.id, email: usuario.email, perfil: usuario.tipo_perfil }, JWT_SECRET, { expiresIn: "2h" });

        return { status: 200, message: "Login realizado com sucesso", token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.tipo_perfil } };
    } catch (error) {
        console.error(error);
        return { status: 500, message: error.message || "Erro interno no servidor", data: null };
    }
}

async function resetPassword(data) {
    const { email, novaSenha } = data;

    if (!email || !novaSenha) {
        return { status: 400, message: "Email e nova senha são obrigatórios", data: null };
    }

    try {
        const usuario = await database("usuario").where({ email }).first();
        if (!usuario) {
            return { status: 404, message: "Usuário não encontrado", data: null };
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);
        await database("usuario").where({ email }).update({ senha: senhaHash });
        return { status: 200, message: "Senha redefinida com sucesso", data: null };
    } catch (error) {
        console.error(error);
        return { status: 500, message: error.message || "Erro interno no servidor", data: null };
    }
}

const authService = { 
    register,
    login,
    resetPassword
};

export default authService;
export { register, login, resetPassword };
