import React from "react";

import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
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
    render: () => <Tab.Pane>Followers Content</Tab.Pane>,
  },
  {
    menuItem: "Following",
    render: () => <Tab.Pane>Following Content</Tab.Pane>,
  },
];

const ProfileContent = () => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      activeIndex={0}
      panes={panes}
    />
  );
};

export default ProfileContent;
