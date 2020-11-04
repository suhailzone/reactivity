import React, { Fragment, useContext } from "react";
import { Header, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../store/rootStore";

const ProfileInfo = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile } = rootStore.profileStore;

  return (
    <Segment>
      <Header content={profile?.bio} />
    </Segment>
  );
};

export default ProfileInfo;
