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

const initialState = {
  fetching: false,
  attempted: false,
  message: null,
  success: null,
  data: null,
  currentQuiz: null,
  result: null,
  answers: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZ:
      return {
        ...state,
        fetching: false,
        success: true,
        data: action.data,
      };
    case FAIL_QUIZ:
      return {
        ...state,
        fetching: false,
        success: false,
        message: action.message,
        attempted: true,
      };
    case REQ_QUIZ:
      return { ...state, fetching: true, attempted: false };
    case SET_QUIZ_BY_ID:
      return { ...state, currentQuiz: action.data, fetching: false, success: true };
    case FAIL_QUIZ_BY_ID:
      return {
        ...state,
        fetching: false,
        success: false,
        message: action.message,
        attempted: true,
      };
    case FINISH_QUIZ_FAIL:
      return {
        ...state,
        fetching: false,
        success: false,
        message: action.message,
        attempted: true,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        fetching: false,
        success: true,
        result: action.result,
      };
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.answers,
      };
    default:
      return { ...state };
  }
};
