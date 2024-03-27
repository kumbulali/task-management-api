const { invalid_credentials } = require('../config/error.messages.config');
const Task = require('../models/task.model');

module.exports.createTask = async function(title, description, completed, authorUserId, assigneeUserId){
    const newTask = new Task({title: title, author: authorUserId});
    
    if(description)
        newTask.description = description;
    if(completed)
        newTask.completed = completed;
    if(assigneeUserId)
        newTask.assignee = assigneeUserId;

    const createdTask = await Task.create(newTask);
    return createdTask;
};