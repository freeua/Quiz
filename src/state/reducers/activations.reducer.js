import {
  REQ_ACTIVATIONS,
  SET_ACTIVATIONS,
  FAIL_ACTIVATIONS,
  SET_SELECTED_ACTIVATION,
} from "../types/activations.types";

const initialState = {
  fetching: false,
  attempted: false,
  message: null,
  success: null,
  data: [],
  selected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQ_ACTIVATIONS:
      return {
        ...state,
        fetching: true,
        attempted: false,
      };

    case FAIL_ACTIVATIONS:
      return {
        ...state,
        fetching: false,
        success: false,
        message: action.message,
        attempted: true,
      };

    case SET_ACTIVATIONS:
      return {
        ...state,
        fetching: false,
        data: [...action.activations],
      };

    case SET_SELECTED_ACTIVATION:
      return {
        ...state,
        selected: action.activation,
      };

    default:
      return state;
  }
};
