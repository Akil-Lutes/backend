const express = require('express');

const characterController = require('./../controllers/characterController');



// Character Router
const router = express.Router();

// Character Routes
// Param middleware
router
    .route('/')
    .get(characterController.getAllCharacters)

router
    .route('/:id')

module.exports = router;