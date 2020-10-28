import React from "react";
import Loader from "../Loader";

import styles from "./ConnectionLoader.module.css";

const ConnectionLoader = () => (
  <div className={styles.wrapper}>
    <p>Waiting for network connection...</p>
    <Loader />
  </div>
);

export default ConnectionLoader;
