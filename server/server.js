const express = require("express");
const session = require("express-session");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/users");
require("./services/local-login");

const User = mongoose.model("users");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: keys.expressSecret,
    resave: false,
    saveUninitialized: false
  })
);

app.use("/user", require("./middleware/auth-check"));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true },
  err => {
    if (err) throw err;
    console.log("mongoDB connection status:", mongoose.connection.readyState);
  }
);

AWS.config.update({
  accessKeyId: keys.AWSaccessKeyID,
  secretAccessKey: keys.AWSsecretAccessKey
});

require("./routes/authRoutes")(app);
require("./routes/apiRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
