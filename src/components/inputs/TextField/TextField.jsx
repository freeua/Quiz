import React from "react";

import styles from "./TextField.module.css";

const TextField = ({ type = "text", label, name, id, ...otherProps }) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}:
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input type={type} id={id} className={styles.input} {...otherProps} />
      </div>
    </div>
  );
};

export default TextField;
