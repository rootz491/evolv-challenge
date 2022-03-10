const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

//  routes
app.use('/api/user', require('./routes/users.route'));
app.use('/api/session', require('./routes/session.route'));
app.use('/api/exercise', require('./routes/exercise.route'));

app.listen(3000, async () => {
    console.log('listening on port 3000');
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to mongo');
})