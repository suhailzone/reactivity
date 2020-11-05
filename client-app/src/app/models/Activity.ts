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
  comments: IComments[];
}

export interface IComments {
  id?: string;
  createdAt?: string;
  body: string;
  username?: string;
  displayName?: string;
  image?: string;
}

export interface IAttendee {
  userName: string;
  displayName: string;
  image: string;
  isHost: boolean;
  following?: boolean;
}
