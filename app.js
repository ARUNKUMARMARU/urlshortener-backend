const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes')
const activateRouter = require('./routes/activateRoutes');
const passwordResetRouter = require('./routes/passwordReset')
const urlRouter = require('./routes/urlRoutes')


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api',userRouter)
app.use('/api',passwordResetRouter)
app.get('/api/activate', activateRouter )
app.use('/api',urlRouter)

module.exports=app;