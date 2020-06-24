const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Contacts = require("../models/Contacts");

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", auth, async (request, response) => {
  try {
    const contacts = await Contacts.find({ user: request.user.id }).sort({
      date: -1
    });
    response.json(contacts);
  } catch (err) {
    console.error(500);
    response.status(500).send("Server Error");
  }
});

// @route   POST api/contacts
// @desc    Add new contact contact
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array });
    }
    const { name, email, phone, type } = request.body;

    try {
      const newContact = new Contacts({
        name,
        email,
        phone,
        type,
        user: request.user.id
      });

      const contact = await newContact.save();

      response.json(contact);
    } catch (err) {
      console.error(err.message);
      response.status(500).send("Sever Error");
    }
  }
);

// @route   UPDATE api/contacts/: id
// @desc    Update a contact
// @access  Private
router.put("/:id", auth, async (request, response) => {
  const { name, email, phone, type } = request.body;

  // build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (name) contactFields.email = email;
  if (name) contactFields.phone = phone;
  if (name) contactFields.type = type;

  try {
    let contact = await Contacts.findById(request.params.id);

    if (!contact)
      return response.status(404).json({ message: "Contact not found" });

    // make sure user owns contact
    if (contact.user.toString() !== request.user.id) {
      return response.status(401).json({ message: "not authorised" });
    }

    contact = await Contacts.findByIdAndUpdate(
      request.params.id,
      { $set: contactFields },
      { new: true }
    );

    response.json(contact);
  } catch {
    console.error(err.message);
    response.status(500).send("Sever Error");
  }
});

// route    DELETE api/contacts/:id
// @desc    delete a contact
// @access  Private
router.delete("/:id", auth, async (request, response) => {

    try {
        let contact = await Contacts.findById(request.params.id);
    
        if (!contact)
          return response.status(404).json({ message: "Contact not found" });
    
        // make sure user owns contact
        if (contact.user.toString() !== request.user.id) {
          return response.status(401).json({ message: "not authorised" });
        }
    
        await Contacts.findByIdAndRemove(request.params.id);
        response.json({message: 'contact removed'});
      } catch {
        console.error(err.message);
        response.status(500).send("Sever Error");
      }
})

module.exports = router;
