// *** Express ***
// Modules
const fs = require('fs');
const express = require("express");
const morgan = require('morgan');


const characterRouter = require('./routes/characterRoutes');

const app = express();


// Middleware

app.use(morgan('dev'));
app.use(express.json());
// *** Top Level Code ***
const characters = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/characters.json`)
);


