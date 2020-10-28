import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Activations from "./Activations";
import Layout from "../../components/Layout";
import {
  getActivations,
  setSelectedActivation,
  setActivations,
} from "../../state/actions/activations.action";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import getDataFromStorage from "../../lib/getDataFromStorage";

const ActivationsContainer = ({
  getActivations,
  setActivations,
  selectActivation,
  activations,
  message,
  loading,
  match,
}) => {
  const [connectionError, setConnectionError] = useState(null);

  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      const activationTypeId = match.params.activationTypeId;

      getActivations(activationTypeId);
    } else {
      getDataFromStorage(window.location.pathname)
        .then(storedPathResponse => {
          setActivations(storedPathResponse);
        })
        .catch(error => {
          setConnectionError(error.message);
        });
    }
  }, [getActivations, isOnline, match.params.activationTypeId, setActivations]);

  return (
    <Layout
      heroType={"ill"}
      showHero
      XAxisPosition={"center"}
      heroStyles={{
        maxWidth: "30rem",
        maxHeight: "25rem",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
      pageTitle="Activations">
      <Activations
        activations={activations}
        selectActivation={selectActivation}
        loading={loading}
        message={message}
        connectionError={connectionError}
      />
    </Layout>
  );
};

const mapStateToProps = state => ({
  message: state.activations.message,
  loading: state.activations.fetching,
  activations: state.activations.data,
});

const mapDispatchToProps = dispatch => ({
  getActivations: activationTypeId => dispatch(getActivations(activationTypeId)),
  selectActivation: activation => dispatch(setSelectedActivation(activation)),
  setActivations: activations => dispatch(setActivations(activations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivationsContainer));
