import chamadoService from "../services/chamadoService.js";

const criarChamado = async (req, res) => {
    try {
        const response = await chamadoService.criarChamado(req.user?.id, req.body);
        res.status(response.status || 201).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const getChamados = async (req, res) => {
    try {
        const userId = req.user?.id;
        const response = await chamadoService.getChamados(userId);
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

const atribuirChamado = async (req, res) => {
    try {
        const chamadoId = req.params.id || req.body?.id;
        const tecnicoId = req.user?.id || req.body?.tecnicoId;
        const response = await chamadoService.atribuirChamado(chamadoId, tecnicoId);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const criarSolucao = async (req, res) => {
    try {
        const chamadoId = req.params.id || req.body?.chamadoId;
        const response = await chamadoService.criarSolucao(chamadoId, req.body);
        res.status(response.status || 201).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const responderSolucao = async (req, res) => {
    try {
        const chamadoId = req.params.id;
        const solucaoId = req.params.solucaoId;
        const { acao } = req.body || {};
        const response = await chamadoService.responderSolucao(chamadoId, solucaoId, acao, req.user?.id);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const criarAvaliacao = async (req, res) => {
    try {
        const chamadoId = req.params.id;
        const response = await chamadoService.criarAvaliacao(chamadoId, req.body);
        res.status(response.status || 201).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const salvarNota = async (req, res) => {
    try {
        const chamadoId = req.params.id;
        const response = await chamadoService.salvarNota(chamadoId, req.body);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const updateChamado = async (req, res) => {
    try {
        const chamadoId = req.params.id || req.body?.id;
        const response = await chamadoService.updateChamado(chamadoId, req.body);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const deleteChamado = async (req, res) => {
    try {
        const chamadoId = req.params.id || req.body?.id;
        const response = await chamadoService.deleteChamado(chamadoId);
        res.status(response.status || 200).json({ response });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

const chamadoController = {
    criarChamado,
    getChamados,
    getChamadosByUser,
    getChamado,
    atribuirChamado,
    criarSolucao,
    responderSolucao,
    criarAvaliacao,
    salvarNota,
    updateChamado,
    deleteChamado
}

export default chamadoController;
