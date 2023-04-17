const createError = require('http-errors');

const { TaskDB } = require('./../models');

module.exports.getTasks = (req, res) => {
  const tasks = TaskDB.getTasks();
  res.status(200).send(tasks);
};

module.exports.createTask = (req, res) => {
  const { body } = req;
  const createdTask = TaskDB.createTask(req.body);
  res.status(201).send(createdTask);
};

module.exports.getTaskByid = (req, res, next) => {
  const { id } = req.params;
  const foundTask = TaskDB.getTaskById(id);
  if (foundTask) {
    return res.status(200).send(foundTask);
  }
  next(createError(404, 'Task Not Found'));
};

module.exports.updateTaskById = (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  const updatedTask = TaskDB.updateTask(id, body);

  if (updatedTask) {
    return res.status(200).send(updatedTask);
  }
  next(createError(404, 'Task Not Found'));
};

module.exports.deleteTaskById = (req, res, next) => {
  const { id } = req.params;
  const deleteTask = TaskDB.deleteTaskById(id);
  if (deleteTask) {
    return res.status(204).send();
  }
  next(createError(404, 'Task Not Found'));
};
