const express = require('express');
const passwordResetRouter = express.Router()
const passwordResetController = require('../contoller/resetPassword')

passwordResetRouter.post('/requestlink', passwordResetController.requestlink);
passwordResetRouter.post('/newpassword', passwordResetController.newpassword);


module.exports=passwordResetRouter;