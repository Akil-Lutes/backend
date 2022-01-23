const express = require('express');

const characterController = require('./../controllers/characterController');



// Character Router
const router = express.Router();

// Character Routes

// Param middleware - only runs for certain parameters in the url route.
router.param('id', characterController.checkID);

router
    .route('/')
    .get(characterController.getAllCharacters);
    // .post(characterController.checkBody);

router
    .route('/:id')
    .get(characterController.getCharacter);

module.exports = router;