import React, { Fragment, useContext, useEffect } from "react";
import "./App.css";
import NavBar from "../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import HomePage from "../features/home/HomePage";
import ActivityForm from "../features/activities/activityform/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../features/user/LoginForm";
import { RootStoreContext } from "../store/rootStore";
import ModalContainer from "../common/modals/ModalContainer";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, setToken, token } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    // if (window.localStorage.getItem('jwt')) {
    if (token) {
      setToken(window.localStorage.getItem("jwt"));
      getUser().finally(() => {
        setAppLoaded();
      });
    }
    // }
    else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token, setToken]);
  // if (!appLoaded) return <LoadingComponent content="Loading app" />;

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route path="/" exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path="/activities" exact component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  exact
                  component={ActivityForm}
                />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
