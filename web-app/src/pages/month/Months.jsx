import {Grid, makeStyles, Paper, Typography } from "@material-ui/core";
//import PeopleIcon from '@mui/icons-material/PeopleOutlined';

import React from 'react';

import OftadehBarChart from "../../components/OftadehChart/OftadehBarChart";

import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";

const useStyles = makeStyles((them) => ({
  paddingPaper: {
    padding: "10px 5px 5px 10px",
  },
  mt: {
    marginTop: 13,
  },
  titlePaper: {
    marginBottom: "16px",
  },
  visitorChart: {
    // height: "150px"
  },
}));

const Months = (props) => {

  const { history } = props;
  const classes = useStyles();
  


  return (
    <OftadehLayout>
      <center><h2 style={{ color: '#033EA4', textalign: "center" , fontStyle:"italic", fontSize:'35px' }}>Monthly statistic </h2></center>

          <Grid item xs={12}>
            <Paper className={classes.paddingPaper} variant="outlined">
              <OftadehBarChart />
            </Paper>
          </Grid>
        

      
    </OftadehLayout>
  );
}

export default Months;
