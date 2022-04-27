const express = require('express');

const characterController = require('./../controllers/characterController');



// Character Router
const router = express.Router();

// Special routes
router
    .route('/get-health-stats')
    .get(characterController.getHealthStats)

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