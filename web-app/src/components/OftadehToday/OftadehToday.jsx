import React from "react";
import moment from "moment";
import { Typography, Divider, makeStyles } from "@material-ui/core";



const useStyles = makeStyles(theme => ({
  dividerMargin: {
    margin: "20px 0"
  }
}));

const OftadehToday = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">{moment().format("dddd")}</Typography>
      <Typography variant="subtitle1">{moment().format("LL")}</Typography>
      <Divider
        classes={{
          root: classes.dividerMargin
        }}
      />
      
    </div>
  );
};

export default OftadehToday;
