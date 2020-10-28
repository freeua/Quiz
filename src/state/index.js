import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";

import user from "./reducers/user.reducer";
import activationTypes from "./reducers/activationTypes.reducer";
import activations from "./reducers/activations.reducer";
import locations from "./reducers/locations.reducer";
import quiz from "./reducers/quiz.reducer";

const initialState = {};

const reducers = combineReducers({
  user,
  activationTypes,
  activations,
  locations,
  quiz,
});

let enhancer;

if (process.env.NODE_ENV !== "production") {
  enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware));
} else {
  enhancer = applyMiddleware(thunkMiddleware);
}

export default createStore(reducers, initialState, enhancer);
