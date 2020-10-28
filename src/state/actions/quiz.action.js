import API from "../../lib/axiosConfig";
import {
  SET_QUIZ,
  FAIL_QUIZ,
  REQ_QUIZ,
  SET_QUIZ_BY_ID,
  FAIL_QUIZ_BY_ID,
  FINISH_QUIZ_FAIL,
  FINISH_QUIZ,
  SET_ANSWERS,
} from "../types/quiz.types";

export const setQuiz = data => dispatch => {
  dispatch({
    type: SET_QUIZ,
    data,
  });
};

export const failQuiz = message => dispatch => {
  dispatch({
    type: FAIL_QUIZ,
    message,
  });
};

export const reqQuiz = () => dispatch => {
  dispatch({
    type: REQ_QUIZ,
  });
};

export const setQuizById = data => dispatch => {
  dispatch({
    type: SET_QUIZ_BY_ID,
    data,
  });
};

export const failQuizById = message => dispatch => {
  dispatch({
    type: FAIL_QUIZ_BY_ID,
    message,
  });
};

export const failFinishQuiz = message => dispatch => {
  dispatch({
    type: FINISH_QUIZ_FAIL,
    message,
  });
};

export const finishQuiz = result => dispatch => {
  dispatch({
    type: FINISH_QUIZ,
    result,
  });
};

export const setAnswers = answers => dispatch => {
  dispatch({
    type: SET_ANSWERS,
    answers,
  });
};

export const fetchQuiz = locationId => async dispatch => {
  dispatch(reqQuiz());
  try {
    const response = await API.get(`/location/${locationId}/quizzes`);
    dispatch(setQuiz(response));

    return response;
  } catch (error) {
    dispatch(failQuiz("Unexpected server error."));

    throw new Error(error);
  }
};

export const fetchQuizById = id => async dispatch => {
  dispatch(reqQuiz());
  try {
    const response = await API.get(`/quiz/${id}`);
    dispatch(setQuizById(response));

    return response;
  } catch (error) {
    dispatch(failQuizById("Unexpected server error."));

    throw error;
  }
};

export const fetchFinishQuiz = (id, data) => async dispatch => {
  dispatch(reqQuiz());
  try {
    const response = await API.post(`/quiz/${id}/new`, data);
    dispatch(finishQuiz(response));

    return response;
  } catch (error) {
    dispatch(failFinishQuiz("Unexpected server error."));

    throw new Error(error);
  }
};

export const setQuizAnswers = answers => async dispatch => {
  try {
    dispatch(setAnswers(answers));
  } catch (error) {
    throw new Error(error);
  }
};
