const AppError = require('../utils/appError');
const Character = require('./../models/characterModel');
const APIFeatures = require('./../utils/apiFeatures');

//                                                                  *** Character Route Handler functions Start ***
// *** .get request ***
// Middleware
exports.aliasTopHealthCharacters = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-health,stun'
    req.query.fields = 'name,health,stun,quote'
    next();
}

exports.getAllCharacters = catchAsync(async (req, res, next) => {

        const features = new APIFeatures(Character.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const characters = await features.query;
        // send back all characters
        res.status(200).json({
            status: 'success',
            results: characters.length,
            data: {
                characters: characters
            }
        });
        res.status(404).json({
            status: 'fail',
            message: err
        })
});

// *** get request ***
exports.getCharacter = catchAsync(async (req, res, next) => {

        const character = await Character.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                characters: character
            }
        });
        res.status(404).json({
            status: 'fail',
            message: err
        });
});

// *** .post requests ***
exports.createCharacter = catchAsync(async (req, res) => {

        const newCharacter = await Character.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                character: newCharacter
            }
        });
        res.status(400).json({
            status: 'fail',
            message: err
        });
});

// *** .post request ***
exports.updateCharacter = catchAsync(async (req, res) => {

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
        res.status(404).json({
            status: 'fail',
            message: err
        });
});

// *** .delete request ***
exports.deleteCharacter = catchAsync(async (req, res, next) => {

    const character = await Character.findByIdAndDelete(req.params.id, req.body, {
        // new updated document will be returned to client
        new: true,
        // validators are ran again ex. maximum length or minimum length in the tour-schema
        runValidators: true
        });

        if (!character) {
        return next(new AppError('No character found that name', 404));
        }
        
        res.status(204).json({
            status: 'success',
            data: null // data no longer exists
        });
});

exports.getHealthStats = catchAsync(async (req, res) => {
    try {
        const stats = await Character.aggregate([
            {
                $match: { health: { $gte: 1000 } }
            }
        ])

        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

//                                                                  *** Character Route Handler functions End ***

