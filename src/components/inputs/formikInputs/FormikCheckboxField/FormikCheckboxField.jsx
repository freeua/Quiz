import React from "react";
import styles from "./FormikCheckboxField.module.css";

export default function FormikCheckboxField({
  label,
  name,
  id,
  error = false,
  formik,
  large,
  ...otherProps
}) {
  const meta = formik.getFieldMeta(name);
  return (
    <div className={`${styles.wrapper} ${styles.wrapperRadio}`}>
      <input
        type="checkbox"
        id={id}
        className={styles.input}
        {...otherProps}
        onBlur={() => formik.setFieldTouched(name, true)}
      />
      <span className={styles.inputRadio}></span>
      <label
        htmlFor={id}
        className={`${meta.touched && meta.error ? styles.error : ""} ${styles.label}`}>
        {label}
      </label>
    </div>
  );
}
