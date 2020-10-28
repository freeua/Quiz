import React from "react";

import styles from "./Label.module.css";

const Label = ({ text }) => <div className={styles.wrapper}>{text}</div>;

export default Label;
