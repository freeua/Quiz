import React from "react";
import { Link } from "react-router-dom";

import styles from "./Card.module.css";

export const Card = ({ bgImage, imageUrl, title, link, onClick, desc }) => {
  if (link) {
    return (
      <div className={styles.wrapper}>
        <Link className={styles.link} to={link} onClick={onClick}>
          <div className={styles.card} style={{ backgroundImage: bgImage && `url(${bgImage})` }}>
            {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
          </div>
          <h3 className={styles.title}>{title}</h3>
          {desc && <div className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.link} to={link} onClick={onClick}>
        <div className={styles.card} style={{ backgroundImage: bgImage && `url(${bgImage})` }}>
          {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
        </div>
        <h3 className={styles.title}>{title}</h3>
        {desc && <div className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />}
      </div>
    </div>
  );
};
