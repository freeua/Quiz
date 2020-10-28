import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import API from "../../lib/axiosConfig";

import registerValidate from "./registerValidate";
import styles from "./Registration.module.css";

import Layout from "../../components/Layout";
import TextField from "../../components/inputs/formikInputs/FormikTextField";
import Button from "../../components/buttons/Button";
import Loader from "../../components/Loader";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import ConnectionLoader from "../../components/ConnectionLoader";

const Registration = ({ history, match }) => {
  const [serverError, setServerError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [registerSuccess, setRegisterSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isOnline = useOnlineStatus();

  const { token } = match.params;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userInfo.first_name,
      surname: userInfo.last_name,
      email: userInfo.email,
      password: "",
      passwordConfirmation: "",
    },
    validate: registerValidate,
    onSubmit: () => {
      setSubmitting(true);
    },
  });

  const register = useCallback(async () => {
    if (isOnline) {
      try {
        setLoading(true);

        const { firstName, surname, email, password, passwordConfirmation } = formik.values;
        const user = {
          email,
          password,
          first_name: firstName,
          last_name: surname,
          password_confirmation: passwordConfirmation,
        };

        await API.post(`/register/confirm/${token}`, user);

        setRegisterSucces(true);
        setSubmitting(false);
        setLoading(false);
      } catch (error) {
        setServerError(error.message);
        setSubmitting(false);
        setLoading(false);
        console.error(error.message);
      }
    }
  }, [formik.values, isOnline, token]);

  useEffect(() => {
    if (submitting) {
      register();
      const intervalApiCall = setInterval(register, 3000);

      return () => {
        clearInterval(intervalApiCall);
      };
    }
  }, [register, submitting]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response = await API.get(`/register/confirm/${token}`);

        setIsTokenValid(true);
        setUserInfo(response);
        setLoading(false);
      } catch (error) {
        setIsTokenValid(false);
        setLoading(false);
        setServerError(error.message);
        console.error(error.message);
      }
    })();
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  const isError = Object.keys(formik.errors).length;
  const errorArray = Object.values(formik.errors);
  const errorNotice = serverError || errorArray[0];

  return (
    <Layout
      pageTitle="Registration"
      showHero={true}
      heroStyles={{
        right: "-3rem",
        maxHeight: "25rem",
        maxWidth: "25rem",
      }}
      heroType={registerSuccess ? "run" : "hero"}
      errorNotice={errorNotice}>
      <div className={styles.wrapper}>
        {loading ? (
          <Loader />
        ) : (
          isTokenValid &&
          (registerSuccess ? (
            <>
              <p className={styles.successRegister}>
                Thank you for registering for the SONAFI Quiz App. Your registration has been
                approved. Please click on the following link to be taken to the login page to
                proceed with the quiz.
              </p>
              <div className={styles.login}>
                <Button href="/login" text="login" />
              </div>
            </>
          ) : (
            <>
              <h1 className="title">Welcome to Sanofi Quiz Registration for Agents</h1>
              <p className={`${styles.description} description`}>
                You have accessed this page via a link sent to you by email.
                <br /> This is intended only for the person who the email belongs to.
                <br />
                Unauthorised access is prohibited..
              </p>
              <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.container}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="First Name"
                    formik={formik}
                    large
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                  <TextField
                    id="surname"
                    name="surname"
                    type="text"
                    label="Surname"
                    formik={formik}
                    large
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                  />
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    disabled={true}
                    large
                    formik={formik}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Enter Password"
                    formik={formik}
                    large
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <TextField
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    label="Confirm Password"
                    formik={formik}
                    large
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                  />
                </div>

                <div className={styles.submit}>
                  <Button type="submit" disabled={isError} text="submit" />
                </div>
              </form>
              <div className={styles.back}>
                <Link to="/login" className="link-underline">
                  Go to login
                </Link>
              </div>
              {submitting && !isOnline && <ConnectionLoader />}
            </>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Registration;
