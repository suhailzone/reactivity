import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
  rootStore: RootStore;

  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    // reaction(
    //   () => this.token,
    //   (token) => {
    //     if (token) {
    //     } else {
    //       console.log("removed");
    //     }
    //   }
    // );
  }

  setToken = (token: string | null) => {
    this.token = token;
    if (this.token) {
      window.localStorage.setItem("jwt", this.token);
    } else {
      window.localStorage.removeItem("jwt");
    }
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
