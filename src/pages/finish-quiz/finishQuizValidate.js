export default values => {
  const errors = {};

  //   if (!values.email) {
  //     errors.email = "Email is a required field";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = "Email Should be valid";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is a required field";
  //   } else if (values.password.length < 6 || values.password.length > 50) {
  //     errors.password = "Password must be between 6 and 30 characters";
  //   }

  return errors;
};
