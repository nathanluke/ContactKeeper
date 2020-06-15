const express = require('express');
const router = express.Router();

// @route   GET api/contacts  
// @desc    Get all users contacts
// @access  Private
router.get('/', (request, response) => {
        response.send('get all contacts');
});

// @route   POST api/contacts  
// @desc    Add new contact contact
// @access  Private
router.post('/', (request, response) => {
    response.send('add a new contact');
});

// @route   UPDATE api/contacts/: id 
// @desc    Update a contact
// @access  Private
router.put('/:id', (request, response) => {
    response.send('update contact');
});

// route    DELETE api/contacts/:id
// @desc    delete a contact
// @access  Private
router.delete('/:id', (request, response) => {
    response.send('delete a contact');
});



module.exports = router; 