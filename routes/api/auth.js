const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../../models/User");

//@route   GET api/auth
//@desc    Test route
//@access  private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   post api/auth
//@desc    Auth(login) user User and get token
//@access  Public

router.post(
  "/",
  [
    check("email", "please provide a valid email").isEmail(),
    check("password", "password is requierd").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "invalid credintials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(404)
          .json({ errors: [{ msg: "invalid credintials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: user.id,
            email: user.email,
            name: user.name,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
