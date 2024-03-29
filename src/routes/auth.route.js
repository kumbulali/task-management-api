const express = require('express'),
    authRouter = express.Router(),
    passport = require('passport'),
    authController = require('../controllers/auth.controller'),
    { validateRegister, validateLogin } = require('../middlewares/validation.middleware');

authRouter.post('/login', validateLogin, authController.login);

authRouter.post('/register', validateRegister, authController.register);

authRouter.get('/google', passport.authenticate('google', { scope: ['email'] }))

authRouter.get('/google/callback', passport.authenticate('google'), authController.googleAuthCallback);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
