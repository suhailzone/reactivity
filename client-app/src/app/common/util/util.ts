import { IActivity, IAttendee } from "../../models/Activity";
import { IUser } from "../../models/User";

export const setActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = activity.date.split(".")[0];
  activity.isGoing = activity.attendees.some(
    (a) => a.userName === user.username
  );
  activity.isHost = activity.attendees.some(
    (a) => a.userName === user.username && a.isHost
  );
  return activity;
};

export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayName: user.displayName,
    isHost: false,
    userName: user.username,
    image: user.image!,
  };
};
