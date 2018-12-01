const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/timetable', { useNewUrlParser: true });

const app = express();

// Routes
const users = require('./routes/route.users');
const faculties = require('./routes/route.faculties');
const groups = require('./routes/route.groups');
const teachers = require('./routes/route.teachers');
const lessons = require('./routes/route.lessons');

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
// Routes   
app.use('/users', users);
app.use('/faculties', faculties);
app.use('/groups', groups);
app.use('/teachers', teachers);
app.use('/lessons', lessons);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status(404);
    next(err);
});

// Error handler funciton
app.use((err, req ,res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    
    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })

    // Respond to server
    console.log(err);
});

// Start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening in port ${port}`));