import React from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./Hero.module.css";

import liverHero from "../../static/images/liver_hero.png";
import liverRun from "../../static/images/liver_run.png";
import liverChill from "../../static/images/liver_chill.png";
import liverDrink from "../../static/images/liver_drink.png";
import liverShow from "../../static/images/liver_show.png";
import liverSport from "../../static/images/liver_sport.png";
import liverIll from "../../static/images/liver_ill.png";

import speechImage from "../../static/images/speech.png";

const Hero = ({ type = "hero", XAxisPosition = "right", style, error = "" }) => {
  let heroImage;
  let xPosition;

  switch (type) {
    case "hero":
      heroImage = liverHero;
      break;
    case "run":
      heroImage = liverRun;
      break;
    case "chill":
      heroImage = liverChill;
      break;
    case "drink":
      heroImage = liverDrink;
      break;
    case "sport":
      heroImage = liverSport;
      break;
    case "show":
      heroImage = liverShow;
      break;
    case "ill":
      heroImage = liverIll;
      break;
    default:
      throw new Error("Can't find your hero type");
  }

  switch (XAxisPosition) {
    case "right":
      xPosition = 0;
      break;
    case "center":
      xPosition = 40;
      break;
    default:
      throw new Error("Can't find your position type");
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        right: `${xPosition}%`,
        ...style,
        bottom: 0,
      }}>
      <CSSTransition in={!!error} timeout={300} classNames="errors" unmountOnExit>
        <div className={styles.speech} style={{ backgroundImage: `url${speechImage}` }}>
          <div className={styles.error}>{error}</div>
        </div>
      </CSSTransition>
      <div className={styles.hero}>
        <img src={heroImage} alt={type} className={styles.heroImg} />
      </div>
    </div>
  );
};

export default Hero;
