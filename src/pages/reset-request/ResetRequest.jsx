import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import API from "../../lib/axiosConfig";

import styles from "./ResetRequest.module.css";
import resetRequestValidate from "./resetRequestValidate";

import Layout from "../../components/Layout";
import Button from "../../components/buttons/Button";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import ConnectionLoader from "../../components/ConnectionLoader";
import FormikTextField from "../../components/inputs/formikInputs/FormikTextField";

const ResetRequest = ({ history }) => {
  const [isRequested, setIsRequested] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const isOnline = useOnlineStatus();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: resetRequestValidate,
    onSubmit: () => {
      setSubmitting(true);
    },
  });

  const requestReset = useCallback(async () => {
    if (isOnline) {
      try {
        await API.post("/password/reset/request", formik.values);

        setIsRequested(true);
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        setServerError(error.message);
      }
    }
  }, [formik.values, isOnline]);

  useEffect(() => {
    if (submitting) {
      requestReset();
      const intervalApiCall = setInterval(requestReset, 3000);

      return () => {
        clearInterval(intervalApiCall);
      };
    }
  }, [requestReset, submitting]);

  useEffect(() => {
    if (serverError) {
      setServerError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  return (
    <Layout showHero heroType="chill" pageTitle="Reset Password">
      <div className={styles.wrapper}>
        {!isRequested ? (
          <>
            <p className={`${styles.description} description`}>
              To reset your password, Please enter your email address and we will send you a link to
              reset it
            </p>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.container}>
                <FormikTextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  formik={formik}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  hasErrorMessage={formik.errors.email || serverError}
                  errorMessage={formik.errors.email || serverError}
                  serverError={serverError}
                />
              </div>

              <div className={styles.submit}>
                <Button type="submit" disabled={Object.keys(formik.errors).length} text="reset" />
              </div>
            </form>
          </>
        ) : (
          <p className={`${styles.description} description`}>
            You will receive an email with a link to reset your password. Please click on the link
            and follow the instructions.
          </p>
        )}
        <div className={styles.back}>
          <Link to="/login" className="link-underline">
            Back to login
          </Link>
        </div>
        {submitting && !isOnline && <ConnectionLoader />}
      </div>
    </Layout>
  );
};

export default ResetRequest;
