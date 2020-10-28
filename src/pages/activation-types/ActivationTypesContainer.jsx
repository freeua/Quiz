import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getActivationTypes,
  setSelectedActivationType,
  setActivationTypes,
} from "../../state/actions/activationTypes.action";

import Activations from "./ActivationTypes";
import Layout from "../../components/Layout";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import getDataFromStorage from "../../lib/getDataFromStorage";

const ActivationTypesContainer = ({
  getActivationTypes,
  activationTypes,
  setActivationTypes,
  selectActivationType,
  message,
  loading,
}) => {
  const [connectionError, setConnectionError] = useState(null);

  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      getActivationTypes();
    } else {
      getDataFromStorage(window.location.pathname)
        .then(storedPathResponse => {
          setActivationTypes(storedPathResponse);
        })
        .catch(error => {
          setConnectionError(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      heroType={"show"}
      showHero
      XAxisPosition={"center"}
      heroStyles={{
        maxWidth: "40rem",
        maxHeight: "20rem",
        // bottom: 80,
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
      pageTitle="Activation Types">
      <Activations
        activationTypes={activationTypes}
        selectActivationType={selectActivationType}
        loading={loading}
        message={message}
        connectionError={connectionError}
      />
    </Layout>
  );
};

const mapStateToProps = state => ({
  activationTypes: state.activationTypes.data,
  message: state.activationTypes.message,
  loading: state.activationTypes.fetching,
});

const mapDispatchToProps = dispatch => ({
  getActivationTypes: () => dispatch(getActivationTypes()),
  selectActivationType: activationType => dispatch(setSelectedActivationType(activationType)),
  setActivationTypes: activationTypes => dispatch(setActivationTypes(activationTypes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivationTypesContainer));
