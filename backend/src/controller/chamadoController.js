import chamadoService from "../services/chamadoService.js";

const getChamados = async (req, res) => {
    try {
        const response = await chamadoService.getChamados();
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const getChamadosByUser = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.id || req.query.id || req.body?.id;
        const response = await chamadoService.getChamadosByUser(userId);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const getChamado = async (req, res) => {
    try {
        const chamadoId = req.params.id || req.query.id || req.body?.id;
        const response = await chamadoService.getChamado(chamadoId);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const chamadoController = {
    getChamados,
    getChamadosByUser,
    getChamado
}

export default chamadoController;
