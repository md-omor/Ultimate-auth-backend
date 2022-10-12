const express = require("express");
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");
const router = express.Router();

// validators
const { runValidation } = require("../validators");
const {
  userSignUpValidator,
  userSignInValidator,
} = require("../validators/auth");

router.post("/signup", userSignUpValidator, runValidation, signup);
router.post("/signin", userSignInValidator, runValidation, signin);
router.get("/signout", signout);

// test
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    message: "you have access to secret page",
  });
});

module.exports = router;
