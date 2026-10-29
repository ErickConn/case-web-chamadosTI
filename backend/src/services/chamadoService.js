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

const chamadoService = {
    getChamados,
    getChamado
}

export default chamadoService;