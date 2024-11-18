const express = require('express');
const userRouter = express.Router();
const {test , signup , login} = require('../Controllers/UserController');


userRouter.get('/test', test);
userRouter.post('/signup', signup);
userRouter.post('/login', login);

module.exports = { userRouter };