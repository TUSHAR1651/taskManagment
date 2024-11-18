const express = require('express');
const taskRouter = express.Router();
const { test } = require('../Controllers/taskController');

taskRouter.get('/test', test);

module.exports = { taskRouter };