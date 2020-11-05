import { observer } from "mobx-react-lite";
import React from "react";

import { Tab } from "semantic-ui-react";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

const panes = [
  {
    menuItem: "About",
    render: () => (
      <Tab.Pane>
        <ProfileAbout />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Photos",
    render: () => (
      <Tab.Pane>
        <ProfilePhotos />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Activities",
    render: () => <Tab.Pane>Activities Content</Tab.Pane>,
  },
  {
    menuItem: "Followers",
    render: () => (
      <Tab.Pane>
        <ProfileFollowings followers />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Following",
    render: () => (
      <Tab.Pane>
        <ProfileFollowings />
      </Tab.Pane>
    ),
  },
];

const ProfileContent: React.FC = () => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default observer(ProfileContent);
