import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Item } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import ActivityStore from "../../../store/activityStore";
import ActivityListItem from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const { activitiesByDate } = useContext(ActivityStore);

  return (
    <Item.Group divided>
      {activitiesByDate.map((activity: IActivity) => (
        <ActivityListItem activity={activity} key={activity.id} />
      ))}
    </Item.Group>
  );
};

export default observer(ActivityList);
