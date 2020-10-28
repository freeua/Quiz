import React from "react";
import styles from "./FormikCheckboxField.module.css";

const FormikRadioField = ({
  label,
  name,
  id,
  error = false,
  formik,
  large,
  onChange,
  ...otherProps
}) => {
  const meta = formik.getFieldMeta(name);
  return (
    <div className={`${styles.wrapper} ${styles.wrapperRadio}`}>
      <input
        type="radio"
        id={id}
        className={styles.input}
        name={name}
        {...otherProps}
        onBlur={() => formik.setFieldTouched(name, true)}
        onChange={formik.handleChange}
      />
      <span className={styles.inputRadio}></span>
      <label
        htmlFor={id}
        className={`${meta.touched && meta.error ? styles.error : ""} ${styles.label}`}>
        {label}
      </label>
    </div>
  );
};

export default FormikRadioField;
