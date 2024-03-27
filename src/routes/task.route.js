const express = require('express'),
    taskRouter = express.Router(),
    taskController = require('../controllers/task.controller'),
    { validateCreateTask } = require('../middlewares/validation.middleware'),
    { checkJwt } = require('../middlewares/authorization.server.middleware');

    
taskRouter.post('/', validateCreateTask, checkJwt, taskController.createTask);

module.exports = taskRouter;
