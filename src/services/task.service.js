const { task_not_found } = require('../config/error.messages.config');
const Task = require('../models/task.model');

const populateOptions = [
    { path: 'author', select: ['-password', '-salt', '-__v'] },
    { path: 'assignee', select: ['-password', '-salt', '-__v'] }
];

module.exports.createTask = async function (title, description, completed, authorUserId, assigneeUserId) {
    const newTask = new Task({ title: title, author: authorUserId });

    if (description)
        newTask.description = description;
    if (completed)
        newTask.completed = completed;
    if (assigneeUserId)
        newTask.assignee = assigneeUserId;

    const createdTask = (await Task.create(newTask)).populate(populateOptions);
    return createdTask;
};

module.exports.getSingleTaskByID = async function (taskId) {
    const foundTask = await Task.findOne({ _id: taskId })
        .populate(populateOptions)
        .select(['-__v']);
    if (!foundTask)
        throw task_not_found;
    return foundTask;
};

module.exports.updateTask = async function (taskId, authorId, fieldsToUpdate) {
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId, author: authorId }, { $set: fieldsToUpdate }, { new: true }).populate(populateOptions).select(['-__v'])
    if (!updatedTask)
        throw task_not_found;
    return updatedTask
}