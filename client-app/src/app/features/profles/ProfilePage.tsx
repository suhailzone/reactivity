import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../layouts/LoadingComponent";
import { RootStoreContext } from "../../store/rootStore";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadProfile,
    profile,
    loadingProfile,
    follow,
    unfollow,
    isCurrentUser,
    updatingIndicator,
  } = rootStore.profileStore;

  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);
  if (loadingProfile) return <LoadingComponent content="Loading Profile" />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          follow={follow}
          unfollow={unfollow}
          isCurrentUser={isCurrentUser}
          updatingIndicator={updatingIndicator}
          profile={profile!}
        />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
