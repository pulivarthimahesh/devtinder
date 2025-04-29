const validator = require("validator");

const signupDataValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter name!!!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid email!!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!!!");
  }
};

module.exports = { signupDataValidation };
