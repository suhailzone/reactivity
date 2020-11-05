import React, { useContext, useEffect } from "react";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../store/rootStore";

import ProfileCards from "./ProfileCards";

interface IProps {
  followers?: boolean;
}

const ProfileFollowings: React.FC<IProps> = ({ followers }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    loadFollowings,
    followings,
    updatingIndicator,
  } = rootStore.profileStore;

  useEffect(() => {
    followers ? loadFollowings("following") : loadFollowings("followers");
  }, [followers, loadFollowings]);

  return (
    <Tab.Pane loading={updatingIndicator}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              followers
                ? `People following ${profile!.displayName}`
                : `People ${profile!.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {followings.map((profile) => (
              <ProfileCards key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileFollowings;
