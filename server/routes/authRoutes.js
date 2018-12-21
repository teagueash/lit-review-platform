const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const validate = require("../services/validate");
const localSignup = require("../services/local-signup");

const User = mongoose.model("users");

module.exports = app => {
  app.post("/verifyAuthorize", (req, res) => {
    // validate USC (ie # characters, all numbers after removing hyphen, etc...)
    const { studentID } = req.body;

    const formattedID = studentID.replace(/-/g, "");

    // perform DB lookup based off
    User.findOne({ role: "admin" }, (err, user) => {
      if (err) {
        console.log("an error occurred: ", err);
        return res.status(400).json({
          message: "Unable to find user with admin privileges"
        });
      }

      const { authorizedUsers } = user;

      if (authorizedUsers.includes(formattedID)) {
        // enable redirect as user is allowed
        return res.status(200).json({
          message: "Congrats you're on the list!"
        });
      } else {
        // user is not authorized, display error message
        return res.status(400).json({
          errors: {
            verify: "Your USC ID has not been authorized to use this resource"
          }
        });
      }
    });
  });

  app.post("/signup", (req, res) => {
    const validationResult = validate.validateSignupForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    return localSignup.completeSignup(req.body, res);
  });

  app.post("/login", (req, res) => {
    const validationResult = validate.validateLoginForm(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    passport.authenticate("local", (err, token, user) => {
      // user not found
      if (err) {
        return res.status(401).json({
          success: false,
          errors: err,
          message: "Check the form for errors."
        });
      }
      // user found
      return res.json({
        success: true,
        message: "You have successfully logged in!",
        token,
        user: user
      });
    })(req, res);
  });

  app.get("/authorize", (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No valid token" });
    }

    jwt.verify(token, keys.jwtSecret, (err, user) => {
      if (err) throw err;

      User.findById(
        {
          _id: user._id
        },
        (err, user) => {
          if (err) throw err;

          user = user.getCleanUser();

          return res.status(200).json({ token, user });
        }
      );
    });
  });
};
