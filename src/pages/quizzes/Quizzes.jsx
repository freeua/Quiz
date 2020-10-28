import React, { useEffect, useState } from "react";
import { fetchQuiz, fetchQuizById, setQuiz } from "../../state/actions/quiz.action";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import StartQuiz from "./StartQuiz";
import styles from "./Quizzes.module.css";
import Exit from "../../components/Exit";
import Loader from "../../components/Loader";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import getDataFromStorage from "../../lib/getDataFromStorage";

const Quizzes = ({ quizzes = [], getQuiz, setQuiz, getQuizById, loading, ...props }) => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [idQuiz, setidQuiz] = useState(-1);
  const [connectionError, setConnectionError] = useState(null);

  const isOnline = useOnlineStatus();
  const { locationId, activationId, activationTypeId } = useParams();

  useEffect(() => {
    if (isOnline) {
      getQuiz(locationId);
    } else {
      getDataFromStorage(window.location.pathname)
        .then(storedPathResponse => {
          setQuiz(storedPathResponse);
        })
        .catch(error => {
          setConnectionError(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModal = () => {
    setisOpenModal(!isOpenModal);
  };

  const onChooseQuiz = id => {
    setidQuiz(id);
    toggleModal();
  };

  const onGetQuizById = () => {
    getQuizById(idQuiz);
    props.history.push(
      `/activation-types/${activationTypeId}/activations/${activationId}/location/${locationId}/quiz/${idQuiz}`
    );
  };

  return (
    <div className={styles.relative}>
      <Layout
        pageTitle="Quizzes"
        showHero
        heroType="drink"
        heroStyles={{
          maxWidth: "40rem",
          maxHeight: "40rem",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}>
        <div style={{ width: "100%" }}>
          <div className={styles.wrapper}>
            {connectionError ? (
              <p className="connection-error">{connectionError}</p>
            ) : loading ? (
              <Loader />
            ) : (
              <div className={styles.cardWrapper}>
                {quizzes &&
                  quizzes.map(item => (
                    <Card
                      key={item.id}
                      title={item.title}
                      desc={item.description}
                      imageUrl={item.image}
                      onClick={() => onChooseQuiz(item.id)}
                    />
                  ))}
              </div>
            )}
          </div>
          <div className={styles.exit}>
            <Exit />
          </div>
        </div>
      </Layout>
      <StartQuiz isOpen={isOpenModal} start={onGetQuizById} toggleModal={toggleModal} />
    </div>
  );
};

const mapStateToProps = state => ({
  quizzes: state.quiz.data,
  message: state.quiz.message,
  loading: state.quiz.fetching,
});

const mapDispatchToProps = dispatch => ({
  getQuiz: locationId => dispatch(fetchQuiz(locationId)),
  setQuiz: quiz => dispatch(setQuiz(quiz)),
  getQuizById: id => dispatch(fetchQuizById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quizzes));
