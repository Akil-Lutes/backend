const fs = require('fs');

// *** Top Level Code ***
const characters = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/characters.json`)
);


//                                                                  *** Character Route Handler functions Start ***
// *** .get requests *** 
exports.getAllCharacters = (req, res) => {
    // send back all characters
    res.status(200).json({
        status: 'success',
        results: characters.length,
        data: {
            characters: characters
        }
    })
}