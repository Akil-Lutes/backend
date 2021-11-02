// *** Express ***
// Modules
const fs = require('fs');
const express = require("express");


const app = express();

// Specifying root url
// app.get('/', (req, res) => {

// });

// *** Top Level Code ***
const characters = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/characters.json`)
);

// *** .get requests *** (event loop)
app.get('/api/v1/characters', (req, res) => {
    // send back all characters
    res.status(200).json({
        status: 'success',
        results: characters.length,
        data: {
            characters: characters
        }
    })
})


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});