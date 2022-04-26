const Character = require('./../models/characterModel');
const APIFeatures = require('./../utils/apiFeatures');

//                                                                  *** Character Route Handler functions Start ***
// *** .get request *** 
exports.getAllCharacters = async (req, res) => {
    try {

        const characters = await Character.find();
        // send back all characters
        res.status(200).json({
            status: 'success',
            results: characters.length,
            data: {
                characters: characters
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

// *** get request ***
exports.getCharacter = async (req, res) => {
    try {

        const character = await Character.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                characters: character
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// *** .post requests ***
exports.createCharacter = async (req, res) => {
    try {

        const newCharacter = await Character.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                character: newCharacter
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

// *** .post request ***
exports.updateCharacter = async (req, res) => {
    try {

        const character = await Character.findByIdAndUpdate(req.params.id, req.body, {
            // new updated document will be returned to client
            new: true,
            runValidator: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                character
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// *** .delete request ***
exports.deleteCharacter = async (req, res) => {
    try {

        await Character.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

//                                                                  *** Character Route Handler functions End ***

