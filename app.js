const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const tasksDB = [
  {
    id: 0,
    name: 'bananas',
    createdAt: '2023-03-01',
    isDone: false,
  },
  {
    id: 1,
    name: 'apples',
    createdAt: '2023-02-28',
    isDone: true,
  },
];
class TasksDB {
  constructor (arr) {
    this.tasks = [...arr];
  }

  createTask (newTask) {
    this.tasks.push({
      ...newTask,
      id: uuidv4(),
      createdAt: new Date(),
      isDone: false,
    });
    return this.tasks[this.tasks.length - 1];
  }

  getTasks () {
    return [...this.tasks];
  }

  getTaskById (id) {
    const foundIndex = this.tasks.findIndex(t => t.id === Number(id));
    return foundIndex === -1 ? null : this.tasks[foundIndex];
  }
}
const tasksDbInstace = new TasksDB(tasksDB);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('some text');
});

app.get('/tasks', (req, res) => {
  const tasks = tasksDbInstace.getTasks();
  res.status(200).send(tasks);
});

app.post('/tasks', (req, res) => {
  const createdTask = tasksDbInstace.createTask(req.body);
  res.status(201).send(createdTask);
});

// const createdTask = tasksDbInstace.createTask({
//   name: 'Water',
//   createdAt: new Date(),
// });

// console.log('task :>> ', createdTask);

module.exports = app;
