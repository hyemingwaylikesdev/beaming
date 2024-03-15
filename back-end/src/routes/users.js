const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /users/register:
 *   post:
 *     description: Register user
 *     tags: [Users]
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
router.post("/register", async (req, res, next) => {
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

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Successfully logged in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: All fields are required / User does not exist / Invalid credentials
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).send({ error: "All fields are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User does not exist." });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials." });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user._id.toHexString(),
      },
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send token and user data
    return res.json({ user, accessToken });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while trying to log in." });
  }
});

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Retrieve the authenticated user's information
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user's information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user's ID
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 role:
 *                   type: string
 *                   description: The user's role
 *                 image:
 *                   type: string
 *                   description: The user's image
 */
router.get("/auth", auth, async (req, res, next) => {
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
