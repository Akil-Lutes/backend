const express = require('express');

const characterController = require('./../controllers/characterController');



// Character Router
const router = express.Router();

// Character Routes

// Param middleware - only runs for certain parameters in the url route.
router.param('id', characterController.checkID);

router
    .route('/')
    .get(characterController.getAllCharacters)
    .post(characterController.checkBody, characterController.createCharacter);

router
    .route('/:id')
    .get(characterController.getCharacter)
    .patch(characterController.updateCharacter)
    .delete(characterController.deleteCharacter);

module.exports = router;