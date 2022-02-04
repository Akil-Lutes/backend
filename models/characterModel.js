const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A character must have a name'],
        unique: true
    },
    health: {
        type: Number,
        required: [true, 'A character must have health points']
    },
    stun: {
        type: Number,
        required: [true, 'A character must have stun points']
    },
    img: {
        data: Buffer,
        contentType: String
    },
    fastestNormal: String,
    bestReversal: String
});

const character = mongoose.model('character', characterSchema);

module.exports = character;