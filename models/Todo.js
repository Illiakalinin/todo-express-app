const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const tasksDB = [
  {
    id: '0',
    name: 'bananas',
    createdAt: '2023-03-01',
    isDone: false,
  },
  {
    id: '1',
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
    const foundIndex = this.tasks.findIndex(t => t.id === id);
    return foundIndex === -1 ? null : this.tasks[foundIndex];
  }

  updateTask (id, values) {
    const foundTaskIndex = this.tasks.findIndex(t => t.id === id);
    if (foundTaskIndex !== -1) {
      this.tasks[foundTaskIndex] = {
        ...this.tasks[foundTaskIndex],
        ...values,
      };
    }

    return foundTaskIndex === -1 ? null : this.tasks[foundTaskIndex];
  }
}

const tasksDbInstace = new TasksDB(tasksDB);

module.exports = tasksDbInstace;
