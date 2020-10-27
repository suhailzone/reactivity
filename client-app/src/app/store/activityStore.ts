import { makeAutoObservable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/Activity";

configure({ enforceActions: "always" });

class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }

  activityRegistry = new Map();
  initialLoading = false;
  activity: IActivity | null = null;
  submitting = false;
  target = "";

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
          activity.date = activity.date.split(".")[0];
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
          this.activity = activity;
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
      runInAction(() => {});
      this.activityRegistry.set(activity.id, activity);
      this.submitting = false;
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
}

export default createContext(new ActivityStore());
