const validator = require("validator");

// validate sign up form
exports.validateSignupForm = payload => {
  const { email, password, name } = payload;

  const errors = {};
  let isValidForm = true;
  let message = "";

  if (!payload || typeof email !== "string" || !validator.isEmail(email)) {
    isValidForm = false;
    errors.email = "Please provide a valid email.";
  }

  if (!payload || typeof password !== "string" || password.trim().length < 8) {
    isValidForm = false;
    errors.password = "Password must have at least 8 characters";
  }

  if (!payload || typeof name !== "string" || name.trim().length === 0) {
    isValidForm = false;
    errors.name = "Please provide your name.";
  }

  if (!isValidForm) {
    message = "Check the form for errors.";
  }

  return {
    success: isValidForm,
    message,
    errors
  };
};

// validate log in login form
exports.validateLoginForm = payload => {
  const { email, password } = payload;

  const errors = {};
  let isValidForm = true;
  let message = "";

  if (
    !payload ||
    typeof email !== "string" ||
    email.trim().length === 0 ||
    !validator.isEmail(email)
  ) {
    isValidForm = false;
    errors.email = "Please provide a valid email.";
  }

  if (
    !payload ||
    typeof password !== "string" ||
    password.trim().length === 0
  ) {
    isValidForm = false;
    errors.password = "Please provide a valid password";
  }

  if (!isValidForm) {
    message = "Check the form for errors.";
  }

  return {
    success: isValidForm,
    message,
    errors
  };
};
