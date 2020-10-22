import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import NavBar from "../features/nav/NavBar";
import { IActivity } from "../models/Activity";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => {
      let activities: IActivity[] = [];
      res.data.forEach((activity: IActivity) => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(res.data as IActivity[]);
    }); // .catch((ex) => console.log(ex));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((activity) => activity.id !== id)]);
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
        />
      </Container>
    </Fragment>
  );
}

export default App;
