import React from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Activations.module.css";

import Loader from "../../components/Loader";
import Exit from "../../components/Exit";

const Activations = ({ activations, selectActivation, loading, connectionError, message }) => {
  const { activationTypeId } = useParams();

  if (loading) return <Loader />;

  if (message) return <p>{message}</p>;

  if (connectionError) return <p className="connection-error">{connectionError}</p>;

  if (activations && activations.length) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.activations}>
          {activations.map(({ title, description, image, id }) => {
            return (
              <Link
                onClick={() => selectActivation({ title, id })}
                to={`/activation-types/${activationTypeId}/activations/${id}`}
                className={styles.activation}
                key={id}>
                <img className={styles.activationImg} src={image} alt="" />
                <h3>{title}</h3>
                <div className={styles.description}>{description}</div>
              </Link>
            );
          })}
        </div>
        <div className={styles.exit}>
          <Exit />
        </div>
      </div>
    );
  }

  return null;
};

export default Activations;
