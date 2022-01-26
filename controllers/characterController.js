const fs = require('fs');
// const { stringify } = require('querystring');

// *** Top Level Code ***
const characters = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/characters.json`)
);

// param middleware
exports.checkID = (req, res, next, value) => {
    console.log(`Character ID is: ${value}`)
    if (req.params.id * 1 > characters.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing Name'
        })
    }
    next();
}




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
};

// *** get request ***
exports.getCharacter = (req, res) => {
    console.log(req.params)
    const id = req.params.id * 1;
    const character = characters.find(elem => elem.id === id) // loops through array in characters.json, creates array of id === req.params (true)
    res.status(200).json({
        status: 'success',
        data: {
            characters: character
        }
    })
};

// *** .post requests ***
exports.createCharacter = (req, res) => {
    console.log(req.body);
    const newId = characters[characters.length - 1].id + 1;
    const newCharacter = Object.assign({ id: newId }, req.body);

    characters.push(newCharacter)

    fs.writeFile(
        `${__dirname}/dev-data/data/characters.json`,
        JSON.stringify(characters),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    character: newCharacter
                }
            })
        }
    )
}

// *** .post request ***
exports.updateCharacter = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            character: '<Updated character here...>'
        }
    })
}

// *** .delete request ***
exports.deleteCharacter = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}

//                                                                  *** Character Route Handler functions End ***