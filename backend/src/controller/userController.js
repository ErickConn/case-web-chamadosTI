import userService from '../services/userService.js';

const getUser = async (req, res) => {
    try {
        const userId = req.params.id || req.query.id || req.body?.id;
        const response = await userService.getUser(userId);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id || req.query.id || req.body?.id;
        const response = await userService.updateUser(userId, req.body);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id || req.query.id || req.body?.id;
        console.log(userId);
        const response = await userService.deleteUser(userId);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const userController = {
    getUser,
    updateUser,
    deleteUser
};

export default userController;