import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import API from "../../lib/axiosConfig";

import loginValidate from "./loginValidate";
import styles from "./Login.module.css";

import Layout from "../../components/Layout";
import TextField from "../../components/inputs/formikInputs/FormikTextField";
import Button from "../../components/buttons/Button";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import ConnectionLoader from "../../components/ConnectionLoader";

const Login = ({ history }) => {
  const [serverError, setServerError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isOnline = useOnlineStatus();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit: () => {
      setSubmitting(true);
    },
  });

  const login = useCallback(async () => {
    if (isOnline) {
      try {
        const response = await API.post("/login", formik.values);

        localStorage.setItem("token", response.access_token);

        setSubmitting(false);
        history.push("/");
      } catch (error) {
        setSubmitting(false);
        setServerError(error.message);
        console.error(error.message);
      }
    }
  }, [formik.values, history, isOnline]);

  useEffect(() => {
    if (submitting) {
      login();
      const intervalApiCall = setInterval(login, 3000);

      return () => {
        clearInterval(intervalApiCall);
      };
    }
  }, [login, submitting]);

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
      pageTitle="Login"
      showHero={true}
      errorNotice={errorNotice}
      heroStyles={{
        right: "-3rem",
        maxHeight: "25rem",
        maxWidth: "25rem",
      }}>
      <div className={styles.wrapper}>
        <h1 className="title">Welcome to Sanofi Quiz </h1>
        <p className={`${styles.description} description`}>
          <br /> Please log into your account to continue.
        </p>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              formik={formik}
              onChange={formik.handleChange}
              value={formik.values.email}
              large
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Enter Password"
              formik={formik}
              onChange={formik.handleChange}
              value={formik.values.password}
              large
            />
          </div>

          <div className={styles.submit}>
            <Button type="submit" disabled={isError} text={submitting ? "Wait..." : "login"} />
          </div>
        </form>

        {submitting && !isOnline && <ConnectionLoader />}

        <div className={styles.back}>
          <Link to="/reset-request" className="link-underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
