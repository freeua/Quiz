import API from "../../lib/axiosConfig";
import { SET_USER, DESTROY_USER, REQ_USER, FAIL_USER } from "../types/user.types";

export const setUser = data => dispatch => {
  dispatch({
    type: SET_USER,
    data,
  });
};

export const reqUser = () => dispatch =>
  dispatch({
    type: REQ_USER,
  });

export const failUser = message => dispatch =>
  dispatch({
    type: FAIL_USER,
    success: false,
    message,
  });

export const destroyUser = () => dispatch =>
  dispatch({
    type: DESTROY_USER,
  });

export const fetchUser = () => async dispatch => {
  dispatch(reqUser());
  try {
    const response = await API.get("/profile");
    dispatch(setUser(response));

    return response;
  } catch (error) {
    dispatch(failUser("Unexpected server error."));

    throw new Error(error.message);
  }
};

export const logOut = () => dispatch => {
  dispatch(destroyUser());
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
