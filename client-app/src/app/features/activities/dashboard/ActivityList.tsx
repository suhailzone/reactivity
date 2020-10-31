import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Item } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import { RootStoreContext } from "../../../store/rootStore";
import ActivityListItem from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { activitiesByDate } = rootStore.activityStore;

  return (
    <Item.Group divided>
      {activitiesByDate.map((activity: IActivity) => (
        <ActivityListItem activity={activity} key={activity.id} />
      ))}
    </Item.Group>
  );
};

export default observer(ActivityList);
