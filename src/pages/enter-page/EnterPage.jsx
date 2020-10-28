import React from "react";
import Layout from "../../components/Layout";
import styles from "./EnterPage.module.css";
import Card from "../../components/Card";
import Exit from "../../components/Exit";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import sync from "../../static/images/sync.png";
import products from "../../static/images/products.png";
import quiz from "../../static/images/quiz.png";
import { getSyncDataReq } from "../../state/actions/locations.action";
import useOnlineStatus from "../../hooks/useOnlineStatus";

const EnterPage = ({ syncData, selected, getSyncDataReq }) => {
  const { locationId, activationId, activationTypeId } = useParams();

  const isOnline = useOnlineStatus();

  if (!selected) return <Redirect to="/" />;

  const formatDate = () => {
    let dateSync = new Date(syncData.sync_date);
    let date = dateSync.getDate();
    let month = dateSync.getMonth() + 1;
    let year = dateSync.getFullYear();
    let hour = dateSync.getHours();
    let minutes = dateSync.getMinutes();

    return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}, ${
      date < 10 ? `0${date}` : date
    }/${month < 10 ? `0${month}` : month}/${year}`;
  };

  return (
    <Layout pageTitle="Activation Types">
      <div className={styles.sectionWrapper}>
        <div className={styles.wrapper}>
          <Card
            title={isOnline ? "Sync Data" : "Offline"}
            bgImage={sync}
            disabled={!isOnline}
            desc={syncData && formatDate()}
            onClick={() => getSyncDataReq(selected || locationId)}
          />
          <Card
            title="Go to products"
            bgImage={products}
            link={`/activation-types/${activationTypeId}/activations/${activationId}/products/${locationId}`}
          />
          <Card
            title="Start a Quiz"
            link={`/activation-types/${activationTypeId}/activations/${activationId}/quizzes/${locationId}`}
            bgImage={quiz}
          />
        </div>
        <div className={styles.exit}>
          <Exit />
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  syncData: state.locations.syncData,
  selected: state.locations.selected,
});

const mapDispatchToProps = dispatch => ({
  getSyncDataReq: id => dispatch(getSyncDataReq(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterPage);
