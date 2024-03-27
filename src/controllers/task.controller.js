const TaskService = require('../services/task.service');

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