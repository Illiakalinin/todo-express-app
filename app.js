const express = require('express');
const { validate, errorHandlers } = require('./middleware');

const { todosController } = require('./controllers');

const app = express();

app.use(express.json());

app.get(
  '/',
  (req, res, next) => {
    next();
  },
  (req, res) => {
    res.send('some text');
  }
);

app.get('/tasks', todosController.getTasks);

app.post('/tasks', validate.validateTaskOnCreate, todosController.createTask);

app.get('/tasks/:id', todosController.getTaskByid);

app.patch(
  '/tasks/:id',
  validate.validateTaskOnUpdate,
  todosController.updateTaskById
);

app.delete('/tasks/:id', todosController.deleteTaskById);

app.use(errorHandlers.validationErrorHandler, errorHandlers.errorHandler);

module.exports = app;
