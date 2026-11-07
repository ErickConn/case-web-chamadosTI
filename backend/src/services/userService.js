import 'dotenv/config';
import database from '../database/export.js';

async function getUser(userId) {
    if (!userId) {
        return {
            status: 400,
            message: "User ID is required"
        };
    }

    try {
        const usuario = await database('usuario').select("*").where({ id: userId }).first();

        if (usuario) {
            return {
                status: 200,
                usuario,
                message: "ok"
            };
        }

        return {
            status: 404,
            message: "User not found"
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function updateUser(userId, updateData) {
    if (!userId) {
        return {
            status: 400,
            message: "User ID is required"
        };
    }

    try {
        const { id, ...dataToUpdate } = updateData || {};

        const updated = await database('usuario').where({ id: userId }).update(dataToUpdate);
        if (!updated) {
            return {
                status: 404,
                message: "User not found"
            };
        }

        const usuario = await database('usuario').select("*").where({ id: userId }).first();
        return {
            status: 200,
            usuario,
            message: "User updated successfully"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function deleteUser(userId) {

    if (!userId) {
        return {
            status: 400,
            message: "User ID is required"
        };
    }

    try {
        await database.transaction(async (trx) => {
            await trx('chamado').where({ tecnicoId: userId }).update({ tecnicoId: null });

            const chamadosUsuario = await trx('chamado').select('id').where({ userId });
            const chamadoIds = chamadosUsuario.map((c) => c.id);

            if (chamadoIds.length > 0) {
                const solucoes = await trx('solucao').select('id').whereIn('chamadoId', chamadoIds);
                const solucaoIds = solucoes.map((s) => s.id);

                if (solucaoIds.length > 0) {
                    await trx('avaliacao').whereIn('solucaoId', solucaoIds).delete();
                    await trx('solucao').whereIn('chamadoId', chamadoIds).delete();
                }

                await trx('chamado').whereIn('id', chamadoIds).delete();
            }

            await trx('usuario').where({ id: userId }).delete();
        });

        return {
            status: 200,
            message: "User deleted sucessfully"
        };
    } catch (e) {
        return {
            status: 500,
            message: e.message || "Internal server error"
        };
    }
}

const userService = {
    getUser,
    updateUser,
    deleteUser
};

export default userService;
export { getUser, updateUser };