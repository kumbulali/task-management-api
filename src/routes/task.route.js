const express = require('express'),
    taskRouter = express.Router(),
    taskController = require('../controllers/task.controller'),
    { validateCreateTask, validateTaskID, validateUpdateTask } = require('../middlewares/validation.middleware'),
    { checkJwt } = require('../middlewares/authorization.server.middleware');


taskRouter.post('/', checkJwt, validateCreateTask, taskController.createTask);

taskRouter.get('/:taskId', checkJwt, validateTaskID, taskController.getSingleTaskByID);

taskRouter.get('/', checkJwt, taskController.getAllTasks);

taskRouter.patch('/:taskId', checkJwt, validateUpdateTask, taskController.updateTask);

taskRouter.delete('/:taskId', checkJwt, validateTaskID, taskController.deleteTask);

module.exports = taskRouter;
