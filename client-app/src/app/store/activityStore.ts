import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { makeAutoObservable, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { createAttendee, setActivityProps } from "../common/util/util";
import { IActivity } from "../models/Activity";
import { RootStore } from "./rootStore";

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  activityRegistry = new Map();
  initialLoading = false;
  activity: IActivity | null = null;
  submitting = false;
  loading = false;
  target = "";
  hubConnection: HubConnection | null = null;

  createHubConnection = (activityId: string) => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection?.state))
      .then(() => {
        this.hubConnection?.invoke("AddToGroup", activityId);
      })
      .catch((err) => console.log(err));

    this.hubConnection.on("ReceiveComment", (comment) => {
      runInAction(() => {
        if (this.activity?.comments === null) {
          let comm = [comment];
          this.activity.comments = comm;
        } else {
          this.activity?.comments.push(comment);
        }
      });
    });
    this.hubConnection.on("Send", (message) => {
      toast.info(message);
    });
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.invoke("RemoveFromGroup", this.activity?.id)
      .then(() => {
        this.hubConnection?.stop();
      })
      .then(() => console.log("connection stopped"))
      .catch((err) => console.log(err));
  };

  addComment = async (values: any) => {
    console.log(values);
    values.activityId = this.activity?.id;
    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (err) {
      console.log(err);
    }
  };

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate = (activities: IActivity[]) => {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    return sortedActivities;
  };

  loadActivities = async () => {
    this.initialLoading = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
        this.initialLoading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.initialLoading = false;
      });
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.initialLoading = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction(() => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.initialLoading = false;
        });
      } catch (err) {
        runInAction(() => {
          this.initialLoading = false;
        });
        console.log(err);
      }
    }
  };

  clearActivty = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
  };

  createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      activity.attendees = attendees;
      activity.isHost = true;
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;

        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  openEditForm = (id: string) => {
    this.selectActivity = this.activityRegistry.get(id);
  };

  openCreateForm = () => {
    this.activity = null;
  };

  cancelSeletedActivity = () => {
    this.activity = null;
  };

  deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });
    }
  };
  attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Activities.attend(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees.push(attendee);
          this.activity.isGoing = true;
          this.activityRegistry.set(this.activity.id, this.activity);
          this.loading = false;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem signing up to activity");
    }
  };

  cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Activities.unattend(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees = this.activity.attendees.filter(
            (a) => a.userName !== this.rootStore.userStore.user?.username
          );
          this.activity.isGoing = false;
          this.activityRegistry.set(this.activity.id, this.activity);
          this.loading = false;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem canceling attendance");
    }
  };
}
