import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layouts/App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";
import ScrollToTop from "./app/features/activities/dashboard/ScrollToTop";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
