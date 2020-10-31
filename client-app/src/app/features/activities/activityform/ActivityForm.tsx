import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../../store/rootStore";

interface DetailParam {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    clearActivty,
    submitting,
    loadActivity,
    activity: initialFormState,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivty();
    };
  }, [
    loadActivity,
    clearActivty,
    match.params.id,
    activity.id.length,
    initialFormState,
  ]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              name="title"
              onChange={handleInputChange}
              placeholder="Title"
              value={activity.title}
            />
            <Form.TextArea
              name="description"
              onChange={handleInputChange}
              rows={2}
              placeholder="Description"
              value={activity.description}
            />
            <Form.Input
              name="category"
              onChange={handleInputChange}
              placeholder="Category"
              value={activity.category}
            />
            <Form.Input
              name="date"
              onChange={handleInputChange}
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            />
            <Form.Input
              name="city"
              onChange={handleInputChange}
              placeholder="City"
              value={activity.city}
            />
            <Form.Input
              name="venue"
              onChange={handleInputChange}
              placeholder="Venue"
              value={activity.venue}
            />
            <Button
              floated="right"
              loading={submitting}
              positive
              type="submit"
              content="Submit"
            />
            <Button
              floated="right"
              content="Cancel"
              onClick={() => history.push("/activities")}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
