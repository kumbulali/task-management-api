const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

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

module.exports.validateCreateTask = function (req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required().max(50).label('Title'),
        description: Joi.string().label('Description'),
        completed: Joi.boolean().label('Completed'),
        assignee: Joi.objectId()
    });

    const { error } = schema.validate(req.body);
    next(error);
};