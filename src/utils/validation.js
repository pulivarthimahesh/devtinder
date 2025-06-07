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

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { signupDataValidation, validateProfileEditData };
