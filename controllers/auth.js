const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
var { expressjwt: sjwt } = require("express-jwt");

// Sign up Controllers
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        error: "The email address is already in use",
      });
    }

    let userName = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${userName}`;

    let newUser = new User({ name, email, password, profile, userName });
    newUser.save((error, success) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      res.json({
        user: success,
        message: "Sign up successfull",
      });
    });
  });
};

// Sign in controllers
exports.signin = (req, res) => {
  const { email, password } = req.body;

  // check if user exist
  User.findOne({ email }).exec((error, user) => {
    if (!user)
      return res.status(404).json({
        error: "User not found. Signup first.",
      });

    // authenticate
    if (!user.authenticate(password)) {
      return res.status(404).json({
        error: "Password do not match.",
      });
    }

    // generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });

    const { _id, userName, name, email, role } = user;

    return res.json({
      token,
      user: { _id, userName, name, email, role },
    });
  });
};

// sign out
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignin = sjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
