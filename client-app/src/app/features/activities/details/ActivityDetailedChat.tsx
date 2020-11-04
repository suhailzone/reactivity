import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { IComments } from "../../../models/Activity";
import { RootStoreContext } from "../../../store/rootStore";

const ActivityDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity,
  } = rootStore.activityStore;
  const [comment, setComment] = useState<IComments>({ body: "" });
  useEffect(() => {
    activity && createHubConnection(activity?.id);
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection]);

  const handleSubmit = () => {
    addComment(comment);
    setComment({ body: "" });
  };

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}

          <Form onSubmit={handleSubmit} reply>
            <Form.TextArea
              value={comment.body}
              onChange={(e) => setComment({ ...comment, body: e.target.value })}
              name="body"
              placeholder="Comment"
              rows={2}
            />
            <Button
              type="submit"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedChat);
