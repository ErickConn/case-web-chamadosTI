const express = require('express');
const router = Router();
const userController = require('../controller/userController.js');

router.get('/perfil', userController.getPerfil);

module.exports = router;