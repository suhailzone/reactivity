import { profile } from "console";
import React, { FormEvent, Fragment, useContext, useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IDetails, IProfile } from "../../models/profile";
import { RootStoreContext } from "../../store/rootStore";

const ProfileForm = ({ setEditMode }: { setEditMode: any }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    setDetails,
    uploadingPhoto,
  } = rootStore.profileStore;

  const [detail, setDetail] = useState<IDetails>({
    displayName: profile?.displayName ? profile.displayName : "",
    bio: profile?.bio ? profile.bio : "",
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setDetail({ ...detail, [name]: value });
  };

  const handleSubmit = () => {
    setEditMode(false);
    setDetails(detail);
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="displayName"
          onChange={handleInputChange}
          placeholder="Display Name"
          value={detail.displayName}
        />
        <Form.Input
          name="bio"
          onChange={handleInputChange}
          placeholder="Bio"
          value={detail?.bio}
        />
        <Button positive floated="right" type="submit" content="Update" />
      </Form>
    </Fragment>
  );
};

export default ProfileForm;
