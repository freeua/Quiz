const loginValidate = values => {
  const errors = {};

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Confirm Password is a required field";
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = "Passwords must be matched";
  }

  if (!values.password) {
    errors.password = "Password is a required field";
  } else if (values.password.length !== 6) {
    errors.password = "Password should be 6 characters long";
  }

  return errors;
};

export default loginValidate;
