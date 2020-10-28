import {
  REQ_LOCATIONS,
  SET_LOCATIONS,
  FAIL_LOCATIONS,
  SET_SELECTED_LOCATION,
  SET_NEW_LOCATION,
  // GET_SYNC_DATA_FAIL,
  GET_SYNC_DATA,
} from "../types/locations.types";

const initialState = {
  fetching: false,
  attempted: false,
  message: null,
  success: null,
  data: [],
  selected: null,
  syncData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQ_LOCATIONS:
      return {
        ...state,
        fetching: true,
        attempted: false,
      };

    case FAIL_LOCATIONS:
      return {
        ...state,
        fetching: false,
        success: false,
        message: action.message,
        attempted: true,
      };

    case SET_LOCATIONS:
      return {
        ...state,
        fetching: false,
        data: [...action.locations],
      };

    case SET_NEW_LOCATION:
      return {
        ...state,
        fetching: false,
        data: [...state.data, action.location],
      };

    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selected: action.location,
      };
    // case GET_SYNC_DATA_FAIL:
    //   return {
    //     ...state,
    //     fetching: false,
    //     success: false,
    //     message: action.message,
    //     attempted: true,
    //   };
    case GET_SYNC_DATA:
      return { ...state, syncData: action.data };
    default:
      return state;
  }
};
