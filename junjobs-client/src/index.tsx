import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./store/reducers/";

const store = createStore(rootReducer, compose(applyMiddleware(thunk, logger)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
