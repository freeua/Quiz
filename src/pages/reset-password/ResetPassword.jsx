import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import API from "../../lib/axiosConfig";

import styles from "./ResetPassword.module.css";
import resetPasswordValidate from "./resetPasswordValidate";

import Layout from "../../components/Layout";
import TextField from "../../components/inputs/formikInputs/FormikTextField";
import Button from "../../components/buttons/Button";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import ConnectionLoader from "../../components/ConnectionLoader";

const ResetPassword = ({ match, history }) => {
  const [isValidToken, setIsValidToken] = useState(null);
  const [resetResponse, setResetResponse] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isOnline = useOnlineStatus();

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validate: resetPasswordValidate,
    onSubmit: async () => {
      setSubmitting(true);
    },
  });

  const resetPassword = useCallback(async () => {
    if (isOnline) {
      try {
        const { password, passwordConfirmation } = formik.values;
        const { email, token } = resetResponse;
        const data = {
          password,
          password_confirmation: passwordConfirmation,
          email,
          token,
        };

        await API.post("/password/reset", data);

        setSubmitting(false);
        history.push("/login");
      } catch (error) {
        setSubmitting(false);
        console.error(error);
      }
    }
  }, [formik.values, history, isOnline, resetResponse]);

  useEffect(() => {
    if (submitting) {
      resetPassword();
      const intervalApiCall = setInterval(resetPassword, 3000);

      return () => {
        clearInterval(intervalApiCall);
      };
    }
  }, [resetPassword, submitting]);

  useEffect(() => {
    (async () => {
      try {
        const token = match.params.token;

        const response = await API.get(`/password/reset/${token}`);

        setIsValidToken(true);
        setResetResponse(response);
      } catch (error) {
        setIsValidToken(false);
        console.error(error);
      }
    })();
  }, [match.params.token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  return (
    <Layout pageTitle="Reset Password">
      <div className={styles.wrapper}>
        {isValidToken ? (
          <>
            <p className={`${styles.description} description`}>Please enter your new password.</p>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.container}>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  formik={formik}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  hasErrorMessage={formik.errors.password}
                  errorMessage={formik.errors.password}
                />
                <TextField
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  label="Confirm Password"
                  formik={formik}
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirmation}
                  hasErrorMessage={formik.errors.passwordConfirmation}
                  errorMessage={formik.errors.passwordConfirmation}
                />
              </div>

              <div className={styles.submit}>
                <Button type="submit" disabled={Object.keys(formik.errors).length} text="reset" />
              </div>
            </form>
          </>
        ) : (
          <p className={`${styles.description} description`}>Your reset Token is not valid</p>
        )}
        <div className={styles.back}>
          <Link to="/login" className="link-underline">
            Back to login
          </Link>
        </div>
      </div>
      {submitting && !isOnline && <ConnectionLoader />}
    </Layout>
  );
};

export default ResetPassword;
