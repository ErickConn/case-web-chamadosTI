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
        const user = await database('usuario').where({ id: userId }).delete();
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