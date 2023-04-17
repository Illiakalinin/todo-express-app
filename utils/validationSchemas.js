const yup = require('yup');

const NAME_VALIDATION_SCHEMA = yup.string().trim().min(2).max(200);

module.exports.CREATE_TASK_VALIDATION_SCHEMA = yup.object({
  name: NAME_VALIDATION_SCHEMA.required(),
  createdAt: yup.date().max(new Date()),
  isDone: yup.boolean(),
});

module.exports.UPDATE_TASK_VALIDATION_SCHEMA = yup.object({
  name: NAME_VALIDATION_SCHEMA,
  createdAt: yup.date().max(new Date()),
  isDone: yup.boolean(),
});
