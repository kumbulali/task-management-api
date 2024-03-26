const express = require('express'),
    authRouter = express.Router(),
    authController = require('../controllers/auth.controller'),
    { validateRegister, validateLogin } = require('../middlewares/validation.middleware');
    
authRouter.post('/login', validateLogin, authController.login);

authRouter.post('/register', validateRegister, authController.register);

module.exports = authRouter;
