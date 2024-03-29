const { task_not_found } = require('../config/error.messages.config');
const Task = require('../models/task.model');
const _ = require('lodash');

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

module.exports.getAllTasks = async function (page, limit, order, filters) {
    if(!limit && page)
        limit = 10;

    if(!order)
        order = 'dsc';

    if(!filters)
        filters = ['-__v'];
    else{
        filters = _.split(filters, ',');
    }

    const startIndex = (page - 1) * (limit || 10);

    const foundTasks = await Task.find({})
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: order === 'dsc' ? -1 : order === 'asc' ? 1 : -1 })
        .populate(populateOptions)
        .select(filters)
        .exec();



    if (!foundTasks.length)
        throw task_not_found;
    return foundTasks;
};

module.exports.updateTask = async function (taskId, authorId, fieldsToUpdate) {
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId, author: authorId }, { $set: fieldsToUpdate }, { new: true }).populate(populateOptions).select(['-__v'])
    if (!updatedTask)
        throw task_not_found;
    return updatedTask
};

module.exports.deleteTask = async function (taskId, authorId) {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, author: authorId });
    if (!deletedTask)
        throw task_not_found;
    return deletedTask;
}