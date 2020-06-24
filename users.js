const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const webtoken = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array });
    }

    const { name, email, password } = request.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        response.status(400).json({ message: "user already exists" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      webtoken.sign(
        payload,
        config.get("webtokenSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          response.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      response.status(500).send("server error");
    }
  }
);

module.exports = router;
