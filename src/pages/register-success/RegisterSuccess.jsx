import React from "react";
import { Link } from "react-router-dom";

import styles from "./ResetPassword.module.css";

import Layout from "../../components/Layout";

const RegisterSuccess = ({ history }) => {
  return (
    <Layout pageTitle="Register Success">
      <div className={styles.wrapper}>
        <p className={`${styles.description} description`}>
          Thank you for registering for the SONAFI Quiz App. Your registration has been approved.
          Please click on the following link to be taken to the login page to proceed with the quiz.
        </p>
        <div className={styles.back}>
          <Link to="/login" className="link-underline">
            Back to login
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterSuccess;
