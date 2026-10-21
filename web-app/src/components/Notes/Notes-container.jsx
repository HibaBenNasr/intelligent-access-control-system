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

const NoteList = [
  {
    id: 1,
    title: "marketing course",
    subTitle: "april 20, 2022, 1:03:13 pm"
  },
  {
    id: 2,
    title: "Travel to Paris",
    subTitle: "april 02, 2022, 12:57:11 pm"
  },
  {
    id: 3,
    title: "Workshop",
    subTitle: "april 20, 2022, 1:03:13 pm"
  }
];

const NotesContainer = () => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <OftadehListItems type="ListItemText" data={NoteList} />
    </List>
  );
};

export default NotesContainer;
