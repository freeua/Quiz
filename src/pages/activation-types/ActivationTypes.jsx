import React from "react";

import styles from "./ActivationTypes.module.css";

import Loader from "../../components/Loader";
import Card from "../../components/Card";

const ActivationTypes = ({
  activationTypes,
  selectActivationType,
  loading,
  connectionError,
  message,
}) => {
  if (loading) return <Loader />;

  if (message) return <p>{message}</p>;

  if (connectionError) return <p className="connection-error">{connectionError}</p>;

  if (activationTypes && activationTypes.length) {
    return (
      <div className={styles.wrapperPage}>
        <div className={styles.wrapper}>
          {activationTypes.map(({ title, image, id }) => (
            <Card
              key={id}
              title={title}
              imageUrl={image}
              onClick={() => selectActivationType({ title, image, id })}
              linkEntity="activations"
              link={`/activation-types/${id}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ActivationTypes;
