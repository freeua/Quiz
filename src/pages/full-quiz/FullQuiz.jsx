/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import {
  fetchQuizById,
  setQuizAnswers,
  fetchFinishQuiz,
  setQuizById,
} from "../../state/actions/quiz.action";
import Layout from "../../components/Layout";
import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import styles from "./FullQuiz.module.css";
import Exit from "../../components/Exit";
import getDataFromStorage from "../../lib/getDataFromStorage";
import useOnlineStatus from "../../hooks/useOnlineStatus";

const FullQuiz = ({
  currentQuiz,
  getQuizById,
  setQuizById,
  setAnswers,
  answers,
  message,
  ...props
}) => {
  const { quizId, locationId, activationId, activationTypeId } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [connectionError, setConnectionError] = useState(null);

  const isOnline = useOnlineStatus();

  const formik = useFormik({
    initialValues: {},
    onSubmit: async values => {
      const questionAnswerArray = Object.keys(values).map(key => ({
        question_id: key,
        answer_id: values[key],
      }));

      if (
        questionAnswerArray.length !== quizQuestions.length ||
        currentPage !== Math.ceil(quizQuestions.length / questionsPerPage)
      ) {
        return;
      } else {
        try {
          setAnswers(questionAnswerArray);
          props.history.push(
            `/activation-types/${activationTypeId}/activations/${activationId}/location/${locationId}/finish-quiz`
          );
        } catch (error) {
          console.error(error.message);
        }
      }
    },
  });

  const next = () => {
    if (
      currentPage + 1 <= Math.ceil(Object.keys(formik.values).length / questionsPerPage) &&
      Object.keys(formik.values).length >= (currentPage + 1) * questionsPerPage
    ) {
      setCurrentPage(currentPage => currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage - 1 !== -1) {
      setCurrentPage(currentPage => currentPage - 1);
    }
  };

  useEffect(() => {
    if (currentQuiz && quizQuestions.length) {
      const transformedQuestionsPerScreen =
        currentQuiz.questions_per_screen > quizQuestions.length ||
        currentQuiz.questions_per_screen === 0
          ? quizQuestions.length
          : currentQuiz.questions_per_screen;

      setQuestionsPerPage(transformedQuestionsPerScreen);
    }
  }, [currentQuiz, quizQuestions.length]);

  useEffect(() => {
    if (isOnline) {
      if (currentQuiz && currentQuiz.id) return;
      getQuizById(quizId);
    } else {
      getDataFromStorage(window.location.pathname)
        .then(storedPathResponse => {
          setQuizById(storedPathResponse);
        })
        .catch(error => {
          setConnectionError(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentQuiz) {
      if (currentQuiz.questions.length > currentQuiz.max_questions) {
        const randomQuestions = currentQuiz.questions
          .sort(() => 0.5 - Math.random())
          .slice(0, currentQuiz.max_questions);

        setQuizQuestions(randomQuestions);
      } else {
        setQuizQuestions(currentQuiz.questions);
      }
    }
  }, [currentQuiz]);

  const currentSlicedIndex = currentPage !== 0 ? currentPage * questionsPerPage : currentPage;
  const currentQuestions =
    quizQuestions && quizQuestions.slice(currentSlicedIndex, currentSlicedIndex + questionsPerPage);

  return (
    <Layout styleMain={{ display: "block" }} pageTitle="Quiz">
      {quizQuestions && !connectionError ? (
        <div className={styles.quizWrapper}>
          <ProgressBar
            progress={{
              current: currentPage,
              full: (currentQuiz && quizQuestions.length / questionsPerPage) || [],
            }}
          />
          <form onSubmit={formik.handleSubmit}>
            {currentQuestions &&
              currentQuestions.map((question, key) => (
                <Question
                  key={key}
                  progress={{
                    current: quizQuestions.findIndex(({ id }) => id === question.id),
                    full: (currentQuiz && quizQuestions) || [],
                  }}
                  question={question}
                  formik={formik}
                  currentAnswer={formik.values && formik.values[question.id]}
                />
              ))}
            <div className={styles.bottomButtons}>
              <Button type="button" text="prev" onClick={prev} />
              <Button text="NEXT" onClick={next} />
            </div>
            <div className={styles.exit}>
              <Exit />
            </div>
          </form>
        </div>
      ) : (
        <div className="connection-error">{connectionError || message}</div>
      )}
    </Layout>
  );
};

const mapStateToProps = state => ({
  currentQuiz: state.quiz.currentQuiz,
  message: state.quiz.message,
  loading: state.quiz.fetching,
  answers: state.quiz.answers,
});

const mapDispatchToProps = dispatch => ({
  //   getQuiz: () => dispatch(fetchQuiz()),
  getQuizById: id => dispatch(fetchQuizById(id)),
  setQuizById: quiz => dispatch(setQuizById(quiz)),
  setAnswers: answers => dispatch(setQuizAnswers(answers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FullQuiz));
