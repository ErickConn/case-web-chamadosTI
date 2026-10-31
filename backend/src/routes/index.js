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

router.get('/solicitante', authMiddleware, chamadoController.getChamadosByUser);
router.get('/chamados', authMiddleware, chamadoController.getChamados);
router.get('/solicitante/:id', authMiddleware, chamadoController.getChamado);

export default router;
