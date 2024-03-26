const Joi = require('joi');

module.exports.validateRegister = function (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(6).required().label('Password'),
        passwordVerify: Joi.ref('password')
    });

    const { error } = schema.validate(req.body);

    next(error);
};

module.exports.validateLogin = function (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required().max(50).label('Email'),
        password: Joi.string().min(6).required().label('Password')
    });

    const { error } = schema.validate(req.body);
    next(error);
};