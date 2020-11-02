export interface IActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  city: string;
  venue: string;
  isGoing: boolean;
  isHost: boolean;
  attendees: IAttendee[];
}

export interface IAttendee {
  userName: string;
  displayName: string;
  image: string;
  isHost: boolean;
}
