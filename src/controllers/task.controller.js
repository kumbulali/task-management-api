const TaskService = require('../services/task.service');
const { getPayloadFromReq } = require('../utils/jwt.util');

module.exports.createTask = async (req, res, next) => {
    try {
        const title = req.body.title,
            description = req.body.description,
            completed = req.body.completed,
            assigneeUserId = req.body.assignee,
            authorUserId = res.locals.jwtPayload.userId;

        const createdTask = await TaskService.createTask(title, description, completed, authorUserId, assigneeUserId);

        res.send(createdTask);
    } catch (err) {
        next(err);
    }
};

module.exports.getSingleTaskByID = async (req, res, next) => {
    try {
        const taskId = req.params.taskId,
            foundTask = await TaskService.getSingleTaskByID(taskId);
        res.send(foundTask);
    } catch (err) {
        next(err);
    }
};

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const { page, limit, order, filters } = req.query;

        const foundTasks = await TaskService.getAllTasks(page, limit, order, filters);
        res.send(foundTasks);
    } catch (err) {
        next(err);
    }
};

module.exports.updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.taskId,
            fieldsToUpdate = req.body,
            jwtPayload = getPayloadFromReq(req);

        const updatedTask = await TaskService.updateTask(taskId, jwtPayload.userId, fieldsToUpdate);
        res.send(updatedTask);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.taskId,
            jwtPayload = getPayloadFromReq(req);

        await TaskService.deleteTask(taskId, jwtPayload.userId);
        res.status(200).send({ message: 'Task removed successfully.' });
    } catch (err) {
        next(err);
    }
};