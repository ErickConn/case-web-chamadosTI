import 'dotenv/config';
import database from '../database/export.js';

async function getChamados() {
    try {
        const chamados = await database('chamado').select("*");

        if (chamados) {
            return {
                status: 200,
                chamados,
                message: "ok"
            };
        }

        return {
            status: 404,
            message: "Chamados not found"
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function getChamadosByUser(userId) {
    if (!userId) {
        return {
            status: 400,
            message: "User ID is required"
        };
    }

    try {
        const chamados = await database('chamado').select("*").where({ userId });

        return {
            status: 200,
            chamados,
            message: "ok"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function getChamado(chamadoId) {
    if (!chamadoId) {
        return {
            status: 400,
            message: "Chamado ID is required"
        };
    }

    try {
        const chamado = await database('chamado').select("*").where({ id: chamadoId }).first();

        if (chamado) {
            return {
                status: 200,
                chamado,
                message: "ok"
            };
        }

        return {
            status: 404,
            message: "Chamado not found"
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function atribuirChamado(chamadoId, tecnicoId) {
    if (!chamadoId || !tecnicoId) {
        return {
            status: 400,
            message: "Chamado ID and Tecnico ID are required"
        };
    }

    try {
        const chamadoExistente = await database('chamado').select("*").where({ id: chamadoId }).first();

        if (!chamadoExistente) {
            return {
                status: 404,
                message: "Chamado not found"
            };
        }

        if (chamadoExistente.tecnicoId) {
            return {
                status: 409,
                message: "Este chamado já está sendo atendido por um técnico"
            };
        }

        await database('chamado')
            .where({ id: chamadoId })
            .update({
                tecnicoId,
                status: 'aguardando resposta'
            });

        const chamado = await database('chamado').select("*").where({ id: chamadoId }).first();
        return {
            status: 200,
            chamado,
            message: "Chamado atribuído com sucesso"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

const chamadoService = {
    getChamados,
    getChamadosByUser,
    getChamado,
    atribuirChamado
}

export default chamadoService;
