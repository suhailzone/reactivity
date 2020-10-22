import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import ActivityForm from "../activityform/ActivityForm";
import ActivityDetails from "../details/ActivityDetails";
import ActivityList from "./ActivityList";

interface IProps {
  activities: IActivity[];
  selectedActivity: IActivity | null;
  selectActivity: (id: string) => void;
  editMode: boolean;
  setEditMode: (edit: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectedActivity,
  submitting,
  target,
  selectActivity,
  editMode,
  deleteActivity,
  setSelectedActivity,
  createActivity,
  editActivity,
  setEditMode,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          target={target}
          submitting={submitting}
          deleteActivity={deleteActivity}
          activities={activities}
          selectActivity={selectActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            setSelected={setSelectedActivity}
            setEditMode={setEditMode}
            activity={selectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            submitting={submitting}
            key={(selectedActivity && selectedActivity.id) || 0}
            createActivity={createActivity}
            editActivity={editActivity}
            activity={selectedActivity}
            setEditMode={setEditMode}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
