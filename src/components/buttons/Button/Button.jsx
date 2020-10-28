import React from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.css";

const Button = ({ type, text, href, ...otherProps }) => {
  if (href) {
    return (
      <Link to={href} className={styles.button} {...otherProps}>
        <div className={styles.text}>{text}</div>
      </Link>
    );
  }

  return (
    <button type={type} className={styles.button} {...otherProps}>
      <div className={styles.text}>{text}</div>
    </button>
  );
};

export default Button;
