import API from "../../lib/axiosConfig";
import {
  REQ_ACTIVATIONS,
  SET_ACTIVATIONS,
  FAIL_ACTIVATIONS,
  SET_SELECTED_ACTIVATION,
} from "../types/activations.types";

export const reqActivations = () => dispatch =>
  dispatch({
    type: REQ_ACTIVATIONS,
  });

export const setActivations = activations => dispatch =>
  dispatch({
    type: SET_ACTIVATIONS,
    activations,
  });

export const failActivationTypes = message => dispatch =>
  dispatch({
    type: FAIL_ACTIVATIONS,
    payload: message,
  });

export const setSelectedActivation = activation => dispatch =>
  dispatch({
    type: SET_SELECTED_ACTIVATION,
    activation,
  });

export const getActivations = activationTypeId => async dispatch => {
  dispatch(reqActivations());
  try {
    const response = await API.get(`/activation/${activationTypeId}`);

    dispatch(setActivations(response));

    return response;
  } catch (error) {
    dispatch(failActivationTypes(error.message));
    console.error(error);
  }
};
