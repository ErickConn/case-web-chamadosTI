import express from 'express';
import userController from '../controller/userController.js';
import chamadoController from '../controller/chamadoController.js';

const router = express.Router();

router.get('/perfil', userController.getUser);
router.put('/perfil', userController.updateUser);
router.delete('/perfil', userController.deleteUser);

router.get('/solicitante', chamadoController.getChamados);
router.get('/solicitante/:id', chamadoController.getChamado);

export default router;