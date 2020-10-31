import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../layouts/LoadingComponent";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import { RootStoreContext } from "../../../store/rootStore";

interface DetailParam {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParam>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivity, initialLoading, activity } = rootStore.activityStore;
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (initialLoading) return <LoadingComponent content="Loading Activity" />;

  if (!activity) return <div>Not Found</div>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
    // <Card fluid>
    //   <Image
    //     wrapped
    //     src={`/assets/categoryImages/${activity!.category}.jpg`}
    //     ui={false}
    //   />
    //   <Card.Content>
    //     <Card.Header>{activity!.title}</Card.Header>
    //     <Card.Meta>
    //       <span className="date">{activity!.date}</span>
    //     </Card.Meta>
    //     <Card.Description>{activity!.description}</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button.Group widths={2}>
    //       <Button
    //         color="blue"
    //         content="Edit"
    //         as={Link}
    //         to={`/manage/${activity.id}`}
    //         basic
    //       />
    //       <Button
    //         color="grey"
    //         onClick={() => history.push("/activities")}
    //         content="Cancel"
    //         basic
    //       />
    //     </Button.Group>
    //   </Card.Content>
    // </Card>
  );
};

export default observer(ActivityDetails);
