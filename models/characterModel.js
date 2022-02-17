const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A character must have a name'],
        unique: true
    },
    quote: {
        type: String,
        required: [true, 'A character must have a quote']
    },
    health: {
        type: Number,
        required: [true, 'A character must have health points']
    },
    stun: {
        type: Number,
        required: [true, 'A character must have stun points']
    },
    icon: {
        data: Buffer,
        contentType: String
    },
    fastestNormal: String,
    bestReversal: String
});

const Character = mongoose.model('character', characterSchema);

module.exports = Character;