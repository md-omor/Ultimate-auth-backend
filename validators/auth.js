const { check } = require("express-validator");

exports.userSignUpValidator = [
  check("name").not().isEmpty().withMessage("Please enter your name"),
  check("email").isEmail().withMessage("Please enter your valid email address"),
  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
];

exports.userSignInValidator = [
  check("email").isEmail().withMessage("Please enter your valid email address"),
  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
];
