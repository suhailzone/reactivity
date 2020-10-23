import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import ActivityStore from "../../../store/activityStore";

const ActivityDetails: React.FC = () => {
  const {
    selectedActivity: activity,
    openEditForm,
    cancelSeletedActivity,
  } = useContext(ActivityStore);
  return (
    <Card fluid>
      <Image
        wrapped
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            color="blue"
            content="Edit"
            onClick={() => openEditForm(activity!.id)}
            basic
          />
          <Button
            color="grey"
            onClick={cancelSeletedActivity}
            content="Cancel"
            basic
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
