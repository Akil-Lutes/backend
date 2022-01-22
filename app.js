// *** Express ***
// Modules
const fs = require('fs');
const express = require("express");
const morgan = require('morgan');


const characterRouter = require('./routes/characterRoutes');

const app = express();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Middleware

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello form the middleware');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// Mounting Routers middleware
app.use('/api/v1/characters', characterRouter);


module.exports = app;


// *** CRUD ***
// Post -> Create

// Get -> Read

// Put -> Update 

// Delete -> Delete