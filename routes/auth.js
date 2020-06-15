const express = require('express');
const router = express.Router();

// @route   POST api/auth
// @desc    get logged in user
// @access  Private
router.get('/', (request, response) => {
        response.send('Get logged in user');
});



// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post('/', (request, response) => {
        response.send('Login users');
});

module.exports = router;

module.exports = router;