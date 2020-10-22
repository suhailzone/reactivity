import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";

interface IProps {
  activity: IActivity;
  setEditMode: (bool: boolean) => void;
  setSelected: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({
  activity,
  setEditMode,
  setSelected,
}) => {
  return (
    <Card fluid>
      <Image
        wrapped
        src={`/assets/categoryImages/${activity.category}.jpg`}
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            color="blue"
            content="Edit"
            onClick={() => setEditMode(true)}
            basic
          />
          <Button
            color="grey"
            onClick={() => setSelected(null)}
            content="Cancel"
            basic
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
