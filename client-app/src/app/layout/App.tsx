import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import NavBar from "../features/nav/NavBar";
import { IActivity } from "../models/Activity";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import agent from "../api/agent";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  useEffect(() => {
    agent.Activities.list()
      .then((res) => {
        let activities: IActivity[] = [];
        res.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(res as IActivity[]);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingComponent content="Loading Activities" />;
  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((activity) => activity.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          setSelectedActivity={setSelectedActivity}
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          setEditMode={setEditMode}
          editMode={editMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}

export default App;
