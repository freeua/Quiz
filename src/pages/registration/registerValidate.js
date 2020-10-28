const registerValidate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First Name is a required field";
  } else if (values.firstName.length > 20) {
    errors.firstName = "Must be 20 characters or less";
  } else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
    errors.firstName = "Field should contain only letters";
  }

  if (!values.surname) {
    errors.surname = "Surname is a required field";
  } else if (values.surname.length > 20) {
    errors.surname = "Must be 20 characters or less";
  } else if (!/^[a-zA-Z ]+$/.test(values.surname)) {
    errors.surname = "Field should contain only letters";
  }

  if (!values.email) {
    errors.email = "Email is a required field";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email Should be valid";
  }

  if (!values.password) {
    errors.password = "Password is a required field";
  } else if (values.password.length !== 6) {
    errors.password = "Password should be 6 characters long";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Confirm Password is a required field";
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = "Passwords must be matched";
  }

  return errors;
};

export default registerValidate;
