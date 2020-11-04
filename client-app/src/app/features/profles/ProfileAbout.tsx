import { profile } from "console";
import React, { useContext, useState } from "react";
import {
  Tab,
  Grid,
  Header,
  Button,
  Card,
  Segment,
  Form,
} from "semantic-ui-react";
import PhotoUploadWidget from "../../common/photoUpload/PhotoUploadWidget";
import { RootStoreContext } from "../../store/rootStore";
import ProfileContent from "./ProfileContent";
import ProfileForm from "./ProfileForm";
import ProfileInfo from "./ProfileInfo";

const ProfileAbout = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile, isCurrentUser } = rootStore.profileStore;

  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header
            icon="user"
            content={`About ${profile?.displayName}`}
            floated="left"
          />
          {isCurrentUser && (
            <Button
              content={editMode ? "Cancel" : "Edit Profile"}
              floated="right"
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm setEditMode={setEditMode} />
          ) : (
            <ProfileInfo />
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileAbout;
