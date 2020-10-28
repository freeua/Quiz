import API from "../../lib/axiosConfig";
import {
  REQ_ACTIVATION_TYPES,
  SET_ACTIVATION_TYPES,
  FAIL_ACTIVATION_TYPES,
  SET_SELECTED_ACTIVATION_TYPE,
} from "../types/activationTypes.types";

export const reqActivationTypes = () => dispatch =>
  dispatch({
    type: REQ_ACTIVATION_TYPES,
  });

export const setActivationTypes = activationTypes => dispatch =>
  dispatch({
    type: SET_ACTIVATION_TYPES,
    activationTypes,
  });

export const failActivationTypes = message => dispatch =>
  dispatch({
    type: FAIL_ACTIVATION_TYPES,
    payload: message,
  });

export const setSelectedActivationType = activationType => dispatch =>
  dispatch({
    type: SET_SELECTED_ACTIVATION_TYPE,
    activationType,
  });

export const getActivationTypes = () => async dispatch => {
  dispatch(reqActivationTypes());
  try {
    const response = await API.get("/activation-types");

    dispatch(setActivationTypes(response));

    return response;
  } catch (error) {
    dispatch(failActivationTypes(error.message));
    console.error(error);
  }
};
