const mongoose = require('mongoose'),
    Joi = require('joi'),
    ObjectID = mongoose.Types.ObjectId;

const JoiObjectId = Joi.string().custom((value, helpers) => {
    const filtered = ObjectID.isValid(value)
    return !filtered ? helpers.error("any.invalid") : value;
}, "invalid objectId",);

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
        assignee: JoiObjectId
    });

    const { error } = schema.validate(req.body);
    next(error);
};

module.exports.validateTaskID = function (req, res, next) {
    const schema = Joi.object({
        taskId: JoiObjectId
    });

    const { error } = schema.validate(req.params);
    next(error);
};

module.exports.validateUpdateTask = function (req, res, next) {
    const paramsSchema = Joi.object({
        taskId: JoiObjectId
    });

    const fieldsToUpdateSchema = Joi.object({
        title: Joi.string().max(50).label('Title'),
        description: Joi.string().label('Description'),
        completed: Joi.boolean().label('Completed'),
        assignee: JoiObjectId
    });

    const paramsError = paramsSchema.validate(req.params).error;
    const bodyError = fieldsToUpdateSchema.validate(req.body).error;
    next(paramsError || bodyError);
};