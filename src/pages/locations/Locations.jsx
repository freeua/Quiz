import React, { useState } from "react";

import { useParams } from "react-router-dom";

import styles from "./Locations.module.css";

import Loader from "../../components/Loader";
import Label from "../../components/Label";
import Datalist from "../../components/Locations";
import TextField from "../../components/inputs/TextField";
import Button from "../../components/buttons/Button";
import Exit from "../../components/Exit";

const Locations = ({
  locations,
  selectedLocation,
  addLocation,
  selectLocation,
  loading,
  connectionError,
  message,
}) => {
  const [newLocation, setNewLocation] = useState("");
  const { activationId, activationTypeId } = useParams();

  const handleAddLocation = () => () => {
    if (!newLocation) {
      return null;
    }

    const location = {
      activation_id: activationId,
      title: newLocation,
    };

    addLocation(location);
    return setNewLocation("");
  };

  if (loading) return <Loader />;

  if (message) return <p>{message}</p>;

  if (connectionError) return <p className="connection-error">{connectionError}</p>;

  if (!locations.length)
    return (
      <div className={styles.serverErrorMessage}>
        <div className="server-error ">No data to display</div>
        <div className={styles.bottomButtons}>
          <Exit />
        </div>
      </div>
    );

  if (locations && locations.length) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.inputWrapper}>
            <Label text="Select Your Location" />

            <Datalist
              id="locations-datalist"
              defaultValue={selectedLocation || ""}
              options={locations}
              onChange={selectLocation}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Label text="Add New Location" />
            <TextField value={newLocation} onChange={event => setNewLocation(event.target.value)} />
          </div>
        </div>
        <div className={styles.addLocationButton}>
          <Button text="Add" disabled={!newLocation} onClick={handleAddLocation()} />
        </div>

        <div className={styles.bottomButtons}>
          {locations.some(({ id }) => Number(selectedLocation) === id) && (
            <Button
              href={`/activation-types/${activationTypeId}/activations/${activationId}/start/${selectedLocation}`}
              text="continue"
            />
          )}
          <Exit />
        </div>
      </div>
    );
  }

  return null;
};

export default Locations;
