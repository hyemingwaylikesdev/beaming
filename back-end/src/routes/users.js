const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res, next) => {
  /**
   * @swagger
   * /users/register:
   *   post:
   *     description: Register user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The user's name.
   *               email:
   *                 type: string
   *                 description: The user's email.
   *               password:
   *                 type: string
   *                 description: The user's password.
   *     responses:
   *       200:
   *         description: Successfully registered user
   */
  //   console.log(req.body);
  //   res.json(req.body);

  try {
    const { email, password, passwordAgain } = req.body;

    // Check if all fields are provided
    if (!email || !password || !passwordAgain) {
      return res.status(400).send({ error: "All fields are required." });
    }

    // Check if passwords match
    if (password !== passwordAgain) {
      return res.status(400).send({ error: "Passwords do not match." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists." });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send({ error: error.message });
    } else {
      console.error(error);
      res
        .status(500)
        .send({ error: "An error occurred while trying to create a user." });
    }
  }
});

module.exports = router;
