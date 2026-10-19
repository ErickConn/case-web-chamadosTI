import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.get('/perfil', userController.getUser);
router.put('/perfil', userController.updateUser);
router.delete('/perfil', userController.deleteUser);

export default router;