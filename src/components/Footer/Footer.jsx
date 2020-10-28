import React from "react";

import styles from "./Footer.module.css";
import logo from "../../static/images/logo.png";

export const Footer = () => (
  <div className={styles.wrapper}>
    <div className={styles.description}>
      Essentiale® Extreme is a herbal preparation to aid liver function and provide support to the
      liver. Each hard gelatin capsule contains: De-oiled enriched phospholipids from soya beans 300
      mg. This unregistered medicine has not been evaluated by the SAHPRA for its quality, safety or
      intended use. Applicant: sano-aventis South Africa (pty) ltd, Reg. no.: 1996/010381/07. Sano
      House, 2 Bond Street,Grand Central Ext. 1, Midrand, 1685. Tel: (011) 256 3700 Fax: (011) 256
      3707.{" "}
      <a
        className={styles.link}
        rel="noopener noreferrer"
        target="_blank"
        href="http://www.sanofi.com">
        http://www.sanofi.com
      </a>
      . SAZA.PCH.19.07.0249c
    </div>
    <div className={styles.logo} style={{ backgroundImage: `url(${logo})` }}></div>
  </div>
);
