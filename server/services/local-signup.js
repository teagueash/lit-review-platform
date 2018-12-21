const mongoose = require("mongoose");

const User = mongoose.model("users");

exports.completeSignup = (user, res) => {
  const { email, name, password } = user;

  User.findOne({ email: email }, (err, user) => {
    console.log();
    if (err) {
      console.log();
      return res.status(400).json({
        success: false,
        message: "Could not process the form."
      });
    } else if (user) {
      return res.status(409).json({
        success: false,
        message: "Check the form for errors.",
        errors: {
          email: "This email is already taken."
        }
      });
    } else {
      const newUser = new User({
        name: name.trim(),
        email: email.trim(),
        role: "student",
      });
      newUser.setPassword(password.trim());

      newUser.save();

      const token = newUser.generateJwt();
      return res.json({
        success: true,
        message: "You have successfully signed up! You can now log in.",
        token: token,
        user: newUser.getCleanUser()
      });
    }
  });
};
