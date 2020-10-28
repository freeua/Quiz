/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useCallback } from "react";
import styles from "./SingleProduct.module.css";
import Layout from "../../components/Layout";
import FormikCheckboxField from "../../components/inputs/formikInputs/FormikCheckboxField/FormikCheckboxField";
import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import FormikTextField from "../../components/inputs/formikInputs/FormikTextField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setPersonReq } from "../../state/actions/person.action";
import API from "../../lib/axiosConfig";
import Loader from "../../components/Loader";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import getDataFromStorage from "../../lib/getDataFromStorage";
import ConnectionLoader from "../../components/ConnectionLoader";
import { personFormStorage } from "../../lib/localForage.instance";

const SingleProduct = ({ setPersonReq }) => {
  const [product, setProduct] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const isOnline = useOnlineStatus();

  const { productId, locationId, activationId, activationTypeId } = useParams();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      age: "",
      cell_no: "",
      agree_to_marketing: false,
    },
    validate: values => {
      const errors = {};
      if (values.age > 123 || values.age < 0) {
        errors.age = "Invalid value";
      }
      if (!values.name) {
        errors.name = "Field is required";
      }
      if (!values.age) {
        errors.age = "Field is required";
      }
      if (!values.email) {
        errors.email = "Field is required";
      }
      if (!values.cell_no) {
        errors.cell_no = "Field is required";
      }
      if (!values.cell_no.match(/^[0-9]{10}$/)) {
        errors.cell_no = "Incorrect value";
      }
      if (
        !values.email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        errors.email = "Incorrect value";
      }
      return errors;
    },
    onSubmit: values => {
      setFormValues({ ...values });
      setSubmitting(true);
    },
  });

  const submitForm = useCallback(async () => {
    if (isOnline) {
      try {
        await setPersonReq({
          ...formValues,
          age: Number(formValues.age),
          product_id: productId,
          activation_type_id: activationTypeId,
          activation_id: activationId,
          location_id: locationId,
        });

        setSubmitting(false);
        setSubmitted(true);

        formik.resetForm();
      } catch (error) {
        setSubmitting(false);
        console.error(error);
      }
    } else {
      try {
        const personFormLength = await personFormStorage.length();

        await personFormStorage.setItem(personFormLength, {
          ...formValues,
          age: Number(formValues.age),
          product_id: productId,
          activation_type_id: activationTypeId,
          activation_id: activationId,
          location_id: locationId,
        });

        setSubmitting(false);
        setSubmitted(true);

        formik.resetForm();
      } catch (error) {
        setSubmitting(false);
        console.error(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activationId, activationTypeId, isOnline, formValues, locationId, productId, setPersonReq]);

  useEffect(() => {
    if (submitting) {
      submitForm();
      const intervalApiCall = setInterval(submitForm, 3000);

      return () => {
        clearInterval(intervalApiCall);
      };
    }
  }, [submitForm, submitting]);

  useEffect(() => {
    if (isOnline) {
      (async () => {
        try {
          setLoading(true);

          const response = await API.get(`/product/${productId}`);

          setProduct(response);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      })();
    } else {
      getDataFromStorage(window.location.pathname)
        .then(storedPathResponse => {
          setProduct(storedPathResponse);
        })
        .catch(error => {
          setConnectionError(error.message);
        });
    }
  }, [isOnline, productId]);

  const isError = Object.keys(formik.errors).length;
  // if (!(location && activation && activationType)) return <Redirect to="/" />;

  return (
    <Layout styleMain={{ display: "block" }} pageTitle="Single product">
      {connectionError ? (
        <p className="connection-error">{connectionError}</p>
      ) : submitted ? (
        <div className={styles.thankyouWrapper}>
          <p className={styles.thankyouText}>Thank you for submitting your details.</p>
          <div className={styles.linksWrapper}>
            <Button type="button" text={"back"} onClick={() => setSubmitted(false)} />
            <Link to="/">
              <Button type="button" text={"start"} />
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.singleProductWrapper}>
          {loading ? (
            <Loader />
          ) : (
            product && (
              <div className={styles.wrapper}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        ZINC-Approved <br /> Product Name
                      </th>
                      <th> Overview Age</th>
                      <th>Age From</th>
                      <th>How to use</th>
                      <th>Ingredients</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.name}>{product.approved_name}</td>
                      <td className={styles.overview}>{product.overview_age}</td>
                      <td className={styles.age}>{product.age_from}</td>
                      <td className={styles.howTo}>{product.how_to_use}</td>
                      <td className={styles.ingredients}>{product.ingredients}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          )}
          <p className={styles.complete}>
            If you would like to receive information about this product in future, please complete
            the form
          </p>

          {submitting && !isOnline && <ConnectionLoader />}

          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.container}>
              <FormikTextField
                id="name"
                name="name"
                type="text"
                label="Name"
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.name}
                errorMessage={formik.errors.name}
                hasErrorMessage
                large
              />
              <FormikTextField
                id="age"
                name="age"
                type="text"
                label="Age"
                formik={formik}
                value={formik.values.age}
                onChange={e => {
                  if (
                    !!e.target.value.match(/^\d+$/) ||
                    (formik.values.age && e.target.value === "")
                  ) {
                    formik.setFieldValue("age", e.target.value);
                  }
                }}
                large
                errorMessage={formik.errors.age}
                hasErrorMessage
              />
              <FormikTextField
                id="email"
                name="email"
                type="email"
                label="Email"
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.email}
                large
                errorMessage={formik.errors.email}
                hasErrorMessage
              />
              <FormikTextField
                id="cell_no"
                name="cell_no"
                type="text"
                label="Cell No"
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.cell_no}
                large
                errorMessage={formik.errors.cell_no}
                hasErrorMessage
              />
              <div className={styles.checkboxWrapper}>
                <FormikCheckboxField
                  id="agree_to_marketing"
                  name="agree_to_marketing"
                  label="I would like to receive future communications from Sanofi (Essentiale)"
                  formik={formik}
                  onChange={formik.handleChange}
                  value={formik.values.agree_to_marketing}
                />
              </div>
            </div>

            <div className={styles.submit}>
              <Button type="submit" text={submitting ? "Wait..." : "Submit"} />
              <Link to="/">
                <Button type="button" disabled={isError} text={"RETURN TO START"} />
              </Link>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

const mapDispatchToProps = dispatch => ({
  setPersonReq: data => dispatch(setPersonReq(data)),
});

export default connect(null, mapDispatchToProps)(SingleProduct);
