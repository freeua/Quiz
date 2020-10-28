import React from "react";

import styles from "./FormikTextField.module.css";

const FormikTextField = ({
  type = "text",
  label,
  name,
  id,
  error = false,
  errorMessage = "",
  hasErrorMessage = false,
  formik,
  large,
  serverError,
  disabled = false,
  ...otherProps
}) => {
  const meta = formik.getFieldMeta(name);

  return (
    <div className={`${styles.wrapper}`}>
      <label
        htmlFor={id}
        className={`${(meta.touched && meta.error) || serverError ? styles.error : ""} ${
          styles.label
        }`}>
        {label}:
      </label>
      <div
        className={`${styles.inputWrapper} ${large ? styles.large : ""} ${
          hasErrorMessage ? styles.marginBottom : ""
        } ${disabled ? styles.disabled : ""}`}>
        <input
          type={type}
          id={id}
          className={styles.input}
          disabled={disabled}
          {...otherProps}
          onBlur={() => formik.setFieldTouched(name, true)}
        />
        {hasErrorMessage && (
          <div className="input-error">
            {((meta.touched && meta.error) || serverError) && errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormikTextField;
