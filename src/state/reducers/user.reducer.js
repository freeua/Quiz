import { SET_USER, DESTROY_USER, REQ_USER, FAIL_USER } from "../types/user.types";

const initialState = {
  fetching: false,
  attempted: false,
  message: null,
  success: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQ_USER:
      return {
        ...state,
        fetching: true,
        attempted: false,
      };

    case FAIL_USER:
      return {
        ...state,
        fetching: false,
        success: false,
        message: action.message,
        attempted: true,
      };

    case SET_USER:
      return {
        ...state,
        fetching: false,
        success: true,
        data: {
          id: action.data.id,
          email: action.data.email,
          firstName: action.data.first_name,
          surname: action.data.last_name,
        },
      };

    case DESTROY_USER:
      return initialState;

    default:
      return state;
  }
};
