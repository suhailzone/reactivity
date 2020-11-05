import { observer } from "mobx-react-lite";
import React from "react";
import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
  Reveal,
} from "semantic-ui-react";
import { IProfile } from "../../models/profile";

interface IProps {
  profile: IProfile;
  follow: (username: string) => void;
  unfollow: (username: string) => void;
  isCurrentUser: boolean;
  updatingIndicator: boolean;
}

const ProfileHeader: React.FC<IProps> = ({
  profile,
  follow,
  unfollow,
  isCurrentUser,
  updatingIndicator,
}) => {
  console.log(profile);

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={(profile && profile.image) || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1">{profile && profile.displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value={profile.followersCount} />
            <Statistic label="Following" value={profile.followingCount} />
          </Statistic.Group>
          <Divider />
          {!isCurrentUser && (
            <Reveal animated="move">
              <Reveal.Content visible style={{ width: "100%" }}>
                <Button
                  fluid
                  color="teal"
                  content={profile.following ? "Following" : "Not Following"}
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  fluid
                  basic
                  loading={updatingIndicator}
                  onClick={
                    profile.following
                      ? () => unfollow(profile.username)
                      : () => follow(profile.username)
                  }
                  color={profile.following ? "red" : "green"}
                  content={profile.following ? "Unfollow" : "Follow"}
                />
              </Reveal.Content>
            </Reveal>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
