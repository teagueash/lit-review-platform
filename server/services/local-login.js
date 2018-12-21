const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// convert mongoose model instance
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// turn id back into mongoose model instance
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (username, password, done) => {
      // find user via email
      const existingUser = await User.findOne({ email: username });
      if (!existingUser) {
        const error = new Error("User does not exist");
        error.email = "User does not exist";

        return done(error);
      }
      // verify password hashes are equal
      if (!existingUser.validPassword(password)) {
        const error = new Error("Incorrect password");
        error.password = "Password is incorrect";

        return done(error);
      }
      // generate token and clean user (just email and name)
      const token = existingUser.generateJwt();
      const cleanUser = existingUser.getCleanUser();

      return done(null, token, cleanUser);
    }
  )
);
