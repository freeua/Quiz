import API from "../../lib/axiosConfig";
import {
  REQ_LOCATIONS,
  SET_LOCATIONS,
  FAIL_LOCATIONS,
  SET_SELECTED_LOCATION,
  SET_NEW_LOCATION,
  GET_SYNC_DATA,
  GET_SYNC_DATA_FAIL,
} from "../types/locations.types";

export const reqLocations = () => dispatch =>
  dispatch({
    type: REQ_LOCATIONS,
  });

export const setLocations = locations => dispatch =>
  dispatch({
    type: SET_LOCATIONS,
    locations,
  });

export const setNewLocation = location => dispatch =>
  dispatch({
    type: SET_NEW_LOCATION,
    location,
  });

export const failLocations = message => dispatch =>
  dispatch({
    type: FAIL_LOCATIONS,
    payload: message,
  });

export const setSelectedLocation = location => dispatch =>
  dispatch({
    type: SET_SELECTED_LOCATION,
    location,
  });

export const getSyncData = data => dispatch =>
  dispatch({
    type: GET_SYNC_DATA,
    data,
  });

export const failSyncData = message => dispatch =>
  dispatch({
    type: GET_SYNC_DATA_FAIL,
    message,
  });

export const addLocation = location => async dispatch => {
  try {
    const response = await API.post("/location", location);

    dispatch(setNewLocation(response));

    return response;
  } catch (error) {
    dispatch(failLocations(error.message));
    console.error(error);
  }
};

export const getLocations = activationId => async dispatch => {
  dispatch(reqLocations());
  try {
    const response = await API.get(`/location/${activationId}`);
    dispatch(setLocations(response));

    return response;
  } catch (error) {
    dispatch(failLocations(error.message));
    console.error(error);
  }
};

export const getSyncDataReq = locationId => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    const tokenString = "Bearer " + token;

    const response = await fetch(`${process.env.REACT_APP_API_URL}location/${locationId}/start`, {
      method: "get",
      headers: new Headers({
        Authorization: tokenString,
      }),
    });

    const responseJSON = await response.json();

    dispatch(getSyncData(responseJSON));

    return response;
  } catch (error) {
    dispatch(failSyncData(error.message));
    console.error(error);
  }
};
