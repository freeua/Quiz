/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout";
import styles from "./FinishQuiz.module.css";
import { useFormik } from "formik";
import FormikTextField from "../../components/inputs/formikInputs/FormikTextField";
import Button from "../../components/buttons/Button";
import Loader from "../../components/Loader";
import FormikCheckboxField from "../../components/inputs/formikInputs/FormikCheckboxField/FormikCheckboxField";
import liverCongratulations from "../../static/images/liver_congratulations.png";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchFinishQuiz, finishQuiz } from "../../state/actions/quiz.action";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import ConnectionLoader from "../../components/ConnectionLoader";
import { quizzesStorage } from "../../lib/localForage.instance";

function FinishQuiz({ answers, currentQuiz, setFinishQuiz, finishQuiz, history }) {
  const [requestValues, setRequestValues] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { locationId, activationId, activationTypeId } = useParams();
  const isOnline = useOnlineStatus();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      age: "",
      cell_no: "",
      anonymous: false,
      agree_to_marketing: false,
    },
    initialErrors: { name: "" },
    validate: values => {
      const errors = {};

      if (!values.anonymous) {
        if (!values.name) {
          errors.name = "Field 'Name' is required";
        }
        if (!values.age.match(/^\d+$/)) {
          errors.age = "Age should be a number";
        }
        if (values.age > 123 || values.age < 0) {
          errors.age = "Age should be from 1 to 123";
        }
        if (!values.age) {
          errors.age = "Field 'Age' is required";
        }
        if (!values.email) {
          errors.email = "Field 'Email' is required";
        }
        if (!values.cell_no) {
          errors.cell_no = "Field 'Cell No' is required";
        }
        // eslint-disable-next-line no-useless-escape
        if (!values.cell_no.match(/^[0-9]{10}$/)) {
          errors.cell_no = "'Cell no' should be a valid telephone number";
        }
        if (
          !values.email.match(
            // eslint-disable-next-line no-useless-escape
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          errors.email = "Email should be valid";
        }
      }
      return errors;
    },
    onSubmit: async values => {
      const reqValues = { ...values };

      if (reqValues.anonymous) {
        reqValues.name = "";
        reqValues.email = "";
        reqValues.age = "";
        reqValues.cell_no = "";
      }
      reqValues.age = Number(reqValues.age);

      setRequestValues({ ...reqValues });

      setSubmitting(true);
    },
  });

  const endQuiz = useCallback(async () => {
    const { id: quizId, questions, products, pass_percentage, image_footer } = currentQuiz;

    if (isOnline) {
      try {
        await setFinishQuiz(quizId, {
          ...requestValues,
          activation_type_id: activationTypeId,
          activation_id: activationId,
          location_id: locationId,
          answers,
        });

        setSubmitting(false);

        history.push(
          `/activation-types/${activationTypeId}/activations/${activationId}/location/${locationId}/result`
        );
      } catch (error) {
        setSubmitting(false);
        console.error(error);
      }
    } else {
      const quizzesLength = await quizzesStorage.length();

      quizzesStorage.setItem(quizzesLength, {
        quizId,
        quiz: {
          ...requestValues,
          activation_type_id: activationTypeId,
          activation_id: activationId,
          location_id: locationId,
          answers,
        },
      });

      let quizCorrectAnswers = [];

      for (const question of questions) {
        for (const answer of question.answers) {
          if (answer.is_correct) {
            quizCorrectAnswers.push(answer.id);
          }
        }
      }

      const userCorrectAnswers = quizCorrectAnswers.filter(correctAnswerId =>
        answers.some(({ answer_id }) => +answer_id === correctAnswerId)
      );

      const correctAnswersPercentage =
        (100 / quizCorrectAnswers.length) * userCorrectAnswers.length;

      const result = {
        correct_answers: userCorrectAnswers.length,
        correct_answers_percentage: correctAnswersPercentage,
        count_answers: answers.length,
        image_footer,
        pass_percentage,
        products: correctAnswersPercentage >= pass_percentage ? products : [],
        quiz_id: quizId,
      };

      finishQuiz(result);

      setSubmitting(false);

      history.push(
        `/activation-types/${activationTypeId}/activations/${activationId}/location/${locationId}/result`
      );
    }
  }, [
    activationId,
    activationTypeId,
    answers,
    currentQuiz,
    finishQuiz,
    history,
    isOnline,
    locationId,
    requestValues,
    setFinishQuiz,
  ]);

  useEffect(() => {
    if (submitting) {
      endQuiz();
      const intervalApiCall = setInterval(endQuiz, 3000);

      return () => {
        clearInterval(intervalApiCall);
      };
    }
  }, [endQuiz, submitting]);

  if (!currentQuiz) return <Redirect to="/" />;

  return (
    <Layout pageTitle="Finish Quiz">
      <div className={styles.finishContentWrapper}>
        <div className={styles.heroWrapper}>
          <img src={liverCongratulations} className={styles.hero} alt="Hero" />
          <div className={styles.heroTitle}>Complete</div>
        </div>
        <p>Thank you for participating.</p>
        <p className={styles.marginBottom}>
          Before we share your results and product recommendations, please can we have your details
          to send future information on our products and their benefits.
        </p>

        {submitting && !isOnline && <ConnectionLoader />}

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <div className={styles.checkboxWrapper}>
              <FormikCheckboxField
                id="anonymous"
                name="anonymous"
                label="I would prefer to remain anonymous."
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.anonymous}
              />
            </div>
            {!formik.values.anonymous && (
              <>
                <FormikTextField
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  formik={formik}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  large
                  errorMessage={formik.errors.name}
                  hasErrorMessage
                />
                <FormikTextField
                  id="age"
                  name="age"
                  type="text"
                  label="Age"
                  formik={formik}
                  onChange={e => {
                    if (
                      !!e.target.value.match(/^\d+$/) ||
                      (formik.values.age && e.target.value === "")
                    ) {
                      formik.setFieldValue("age", e.target.value);
                    }
                  }}
                  value={formik.values.age}
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
              </>
            )}
          </div>

          <div className={styles.submit}>
            <Button type="submit" text={submitting ? "Wait..." : "GET YOUR RESULTS"} />
          </div>
        </form>
      </div>
    </Layout>
  );
}

const mapStateToProps = state => ({
  answers: state.quiz.answers,
  currentQuiz: state.quiz.currentQuiz,
  result: state.quiz.result,
  message: state.quiz.message,
  location: state.locations.selected,
  activation: state.activations.selected,
  activationType: state.activationTypes.selected,
});

const mapDispatchToProps = dispatch => ({
  setFinishQuiz: (id, data) => dispatch(fetchFinishQuiz(id, data)),
  finishQuiz: result => dispatch(finishQuiz(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishQuiz);
