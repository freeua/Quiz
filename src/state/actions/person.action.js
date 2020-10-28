import { SET_PERSON, SET_PERSON_FAIL } from "../types/person.types";
import API from "../../lib/axiosConfig";

export const setPerson = () => dispatch =>
  dispatch({
    type: SET_PERSON,
  });
export const setPersonFail = () => dispatch =>
  dispatch({
    type: SET_PERSON_FAIL,
  });

export const setPersonReq = data => async dispatch => {
  try {
    const response = await API.post(`/person`, data);

    return response;
  } catch (error) {
    console.error(error);
  }
};
