const fs = require('fs');

// *** Top Level Code ***
const characters = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/characters.json`)
);


//                                                                  *** Character Route Handler functions Start ***
// *** .get request *** 
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

// *** get request ***
exports.getCharacter = (req, res) => {
    console.log(req.params)
    const id = req.params.id * 1;
    const characters = characters.find(elem => elem.id === id) // loops through array in characters.json, creates array of id === req.params (true)
    res.status(200).json({
        status: 'success',
        data: {
            characters: characters
        }
    })
}