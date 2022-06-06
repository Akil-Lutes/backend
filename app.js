// *** Express ***
// Modules

const express = require("express");
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
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

// Router ERROR HANDLING
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // This is why I can just pass in just next in my catchAsync function catch/promise
});


// Global ERROR HANDLING Middleware (Express)
// documentation https://expressjs.com/en/guide/error-handling.html
app.use(globalErrorHandler);

module.exports = app;


// *** CRUD ***
// Post -> Create

// Get -> Read

// Put -> Update 

// Delete -> Delete