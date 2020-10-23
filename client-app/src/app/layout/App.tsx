import React, { Fragment, useContext, useEffect } from "react";
import "./App.css";
import NavBar from "../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";

function App() {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivity();
  }, [activityStore]);

  if (activityStore.initialLoading) {
    return <LoadingComponent content="Loading Activities" />;
  }

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
