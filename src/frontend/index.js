import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import reducer from "./reducers";
import App from "./routes/App";

// Leyendo la documentación, yo sólo agregué lo siguiente y me funcionó a la perfección.

// const composeEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// const store = createStore(rootReducer, initialState, composeEnhancers)

const history = createBrowserHistory();

const preloadedState = window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))
);

delete window.__PRELOADED_STATE__;

ReactDom.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App isLogged={preloadedState.user.id} />
    </Router>
  </Provider>,
  document.getElementById("app")
);
