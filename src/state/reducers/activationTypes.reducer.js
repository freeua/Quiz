import {
  FAIL_ACTIVATION_TYPES,
  REQ_ACTIVATION_TYPES,
  SET_ACTIVATION_TYPES,
  SET_SELECTED_ACTIVATION_TYPE,
} from "../types/activationTypes.types";

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
    case REQ_ACTIVATION_TYPES:
      return {
        ...state,
        fetching: true,
        attempted: false,
      };

    case FAIL_ACTIVATION_TYPES:
      return {
        ...state,
        fetching: false,
        success: false,
        message: action.message,
        attempted: true,
      };

    case SET_ACTIVATION_TYPES:
      return {
        ...state,
        fetching: false,
        data: [...action.activationTypes],
      };

    case SET_SELECTED_ACTIVATION_TYPE:
      return {
        ...state,
        selected: action.activationType,
      };

    default:
      return state;
  }
};
