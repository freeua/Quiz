import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.progressbarWrapper}>
      <span>Your Progress</span>
      <div className={styles.progressbar}>
        {Array.from(Array(Math.ceil(progress.full)).keys()).map(key => (
          <div
            key={key}
            style={{ width: `${100 / progress.full}%` }}
            className={`${styles.point} ${key <= progress.current ? styles.fill : ""}`}></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
