import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import OftadehListItems from "../OftadehListItems/OftadehListItems";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

// Show notification
const notifList = [
 
  {
    id: 1,
    title: "L'espace est bientôt complet !  ",
    icon: "adjust",
    color: "secondary",
   
  },
  
];

const NotificationsContainer = props => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <OftadehListItems type="ListItemIcon" data={notifList} />
    </List>
  );
};

export default NotificationsContainer;
