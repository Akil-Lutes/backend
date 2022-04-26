const mongoose = require('mongoose');
const slugify = require('slugify');

// Schema
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

// Document Pre Middleware
characterSchema.pre('save', function (next) {
    console.log(doc);
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Aggregation Middleware pipeline
characterSchema.pre('aggregate', function (next) {
    // this.pipeline().unshift({ $match: { secretCharacter: { $ne: true } } });

    console.log(this.pipeline());
    next();
})

module.exports = Character;