const express = require('express');

const characterController = require('./../controllers/characterController');



// Character Router
const router = express.Router();

// Character Routes

router
    .route('/')
    .get(characterController.getAllCharacters)
    .post(characterController.createCharacter);

router
    .route('/:id')
    .get(characterController.getCharacter)
    .patch(characterController.updateCharacter)
    .delete(characterController.deleteCharacter);

module.exports = router;