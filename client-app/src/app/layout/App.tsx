import React, { Fragment } from "react";
import "./App.css";
import NavBar from "../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import ActivityForm from "../features/activities/activityform/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route path="/" exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route path="/activities" exact component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                exact
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
