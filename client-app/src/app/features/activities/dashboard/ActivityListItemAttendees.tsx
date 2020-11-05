import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../models/Activity";

interface IProps {
  attendees: IAttendee[];
}

const styles = {
  borderColor: "orange",
  borderWidth: 2,
};

const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <List.Item key={attendee.displayName}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Image
                size="mini"
                circular
                style={attendee.following ? styles : null}
                bordered
                src={attendee.image || "/assets/user.png"}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
