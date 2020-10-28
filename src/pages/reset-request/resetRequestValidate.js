const loginValidate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is a required field";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email Should be valid";
  }

  return errors;
};

export default loginValidate;
