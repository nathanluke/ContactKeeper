const express = require('express');
const { request, response } = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (request, response) => {
        response.send('Register a user');
});

module.exports = router; 