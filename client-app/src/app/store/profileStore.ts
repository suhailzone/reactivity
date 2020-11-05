import { computed, makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { IDetails, IProfile } from "../models/profile";
import { RootStore } from "./rootStore";

export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  profile: IProfile | null = null;
  loadingProfile = true;
  updatingIndicator = false;
  uploadingPhoto = false;
  followings: IProfile[] = [];

  @computed get isCurrentUser() {
    if (this.profile && this.rootStore.userStore.user) {
      return this.rootStore.userStore.user.username === this.profile.username;
    } else {
      return false;
    }
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profile.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (err) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(err);
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profile.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (err) {
      runInAction(() => {
        this.uploadingPhoto = false;
      });
      toast.error("Problem uploading photo");
      console.log(err);
    }
  };
  setDetails = async (details: IDetails) => {
    this.updatingIndicator = true;
    try {
      await agent.Profile.setDetails(details);
      runInAction(() => {
        this.loadProfile(this.rootStore.userStore.user?.username!);
        this.rootStore.userStore.getUser();
        this.updatingIndicator = false;
      });
    } catch (err) {
      console.log(err);
      toast.error("Problem Updating");
      runInAction(() => {
        this.updatingIndicator = false;
      });
    }
  };

  follow = async (username: string) => {
    this.updatingIndicator = true;
    try {
      await agent.Profile.follow(username);
      runInAction(() => {
        this.profile!.following = true;
        this.profile!.followersCount++;
        this.updatingIndicator = false;
      });
    } catch (err) {
      runInAction(() => {
        this.updatingIndicator = false;
      });
      toast.error("Problem following user");
    }
  };
  unfollow = async (username: string) => {
    this.updatingIndicator = true;
    try {
      await agent.Profile.unfollow(username);
      runInAction(() => {
        this.profile!.following = false;
        this.profile!.followersCount--;
        this.updatingIndicator = false;
      });
    } catch (err) {
      runInAction(() => {
        this.updatingIndicator = false;
      });
      toast.error("Problem unfollowing user");
    }
  };

  loadFollowings = async (predicate: string) => {
    this.updatingIndicator = true;
    try {
      const profiles = await agent.Profile.listFollowings(
        this.profile!.username,
        predicate
      );
      runInAction(() => {
        this.followings = profiles;
        this.updatingIndicator = false;
      });
    } catch (err) {
      runInAction(() => {
        this.updatingIndicator = false;
      });
      toast.error("Problem loading followings");
    }
  };
}
