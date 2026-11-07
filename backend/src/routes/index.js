import express from 'express';
import userController from '../controller/userController.js';
import chamadoController from '../controller/chamadoController.js';
import authController from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/perfil', authMiddleware, userController.getUser);
router.put('/perfil', authMiddleware, userController.updateUser);
router.delete('/perfil', authMiddleware, userController.deleteUser);

router.post('/cadastro', authController.register);
router.post('/login', authController.login);
router.post('/esqueci-senha', authController.resetPassword);

router.post('/chamados', authMiddleware, chamadoController.criarChamado);
router.get('/solicitante', authMiddleware, chamadoController.getChamadosByUser);
router.get('/chamados', authMiddleware, chamadoController.getChamados);
router.get('/chamados/:id', authMiddleware, chamadoController.getChamado);
router.put('/chamados/:id', authMiddleware, chamadoController.updateChamado);
router.delete('/chamados/:id', authMiddleware, chamadoController.deleteChamado);
router.put('/chamados/:id/atribuir', authMiddleware, chamadoController.atribuirChamado);
router.post('/chamados/:id/solucao', authMiddleware, chamadoController.criarSolucao);
router.put('/chamados/:id/solucao/:solucaoId', authMiddleware, chamadoController.responderSolucao);
router.post('/chamados/:id/avaliacao', authMiddleware, chamadoController.criarAvaliacao);
router.put('/chamados/:id/nota', authMiddleware, chamadoController.salvarNota);
router.get('/solicitante/:id', authMiddleware, chamadoController.getChamado);

export default router;
