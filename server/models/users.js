const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  documents: [
    {
      // keep track of a global variable server side for this number
      // id: Number,
      topic: String,
      date: Date,
      assignedTo: String,
      submitted: Boolean,
      path: String
    }
  ],
  authorizedUsers: [{ type: "String" }],
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000)
    },
    keys.jwtSecret
  );
};

userSchema.methods.getCleanUser = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role
  };
};

mongoose.model("users", userSchema);
