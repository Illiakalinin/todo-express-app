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

app.patch(
  '/tasks/:id',
  validate.validateTaskOnUpdate,
  todosController.updateTaskById
);

app.use(errorHandlers.validationErrorHandler, errorHandlers.errorHandler);

module.exports = app;
