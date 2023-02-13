const express = require('express');
require('express-async-errors');

const app = express();

app.use(express.json());

app.use('/course');
app.use('/student');
app.use('/auth');

module.exports = app;