import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, useParams } from "react-router-dom";

import Locations from "./Locations";
import Layout from "../../components/Layout";
import {
  getLocations,
  setSelectedLocation,
  addLocation,
  getSyncDataReq,
  setLocations,
} from "../../state/actions/locations.action";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import getDataFromStorage from "../../lib/getDataFromStorage";

const LocationsContainer = ({
  getLocations,
  setLocations,
  selectLocation,
  addLocation,
  locations = [],
  selectedLocation,
  message,
  loading,
  getSyncDataReq,
  selectedActivationType,
}) => {
  const [connectionError, setConnectionError] = useState(null);

  const { activationId } = useParams();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      getLocations(activationId);
    } else {
      getDataFromStorage(window.location.pathname)
        .then(storedPathResponse => {
          setLocations(storedPathResponse);
        })
        .catch(error => {
          setConnectionError(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectedLocation && getSyncDataReq(selectedLocation);
  }, [getSyncDataReq, selectedLocation]);

  if (!selectedActivationType) return <Redirect to="/" />;
  return (
    <Layout
      showHero={true}
      heroType="sport"
      XAxisPosition="center"
      heroStyles={{
        maxWidth: "33rem",
        maxHeight: "33rem",
        bottom: 10,
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
      pageTitle="Locations">
      <Locations
        locations={locations}
        selectedLocation={selectedLocation}
        selectLocation={selectLocation}
        addLocation={addLocation}
        loading={loading}
        connectionError={connectionError}
        message={message}
      />
    </Layout>
  );
};

const mapStateToProps = state => ({
  message: state.locations.message,
  loading: state.locations.fetching,
  locations: state.locations.data,
  selectedLocation: state.locations.selected,
  selectedActivationType: state.activationTypes.selected,
});

const mapDispatchToProps = dispatch => ({
  getLocations: activationId => dispatch(getLocations(activationId)),
  setLocations: locations => dispatch(setLocations(locations)),
  selectLocation: location => dispatch(setSelectedLocation(location)),
  addLocation: location => dispatch(addLocation(location)),
  getSyncDataReq: location => dispatch(getSyncDataReq(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LocationsContainer));
