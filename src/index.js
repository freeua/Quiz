import "core-js";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./css/normalize.css";
import "./css/index.css";
import "./css/rc-select.css";
import App from "./routes/App";
import * as serviceWorker from "./serviceWorker";

import store from "./state";
import checkExpirationLocalStorageItems from "./lib/checkExpirationLocalStorageItems";
import sendRequestQueue from "./lib/sendRequestQueue";

checkExpirationLocalStorageItems();

sendRequestQueue();

window.addEventListener("online", sendRequestQueue);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
