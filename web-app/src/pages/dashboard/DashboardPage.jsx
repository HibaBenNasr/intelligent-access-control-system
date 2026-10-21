import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";
import { Paper, Grid, makeStyles, Typography } from "@material-ui/core";
import Button from '@mui/material/Button';
import OftadehPieChart from "../../components/OftadehChart/OftadehPieChart";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./../../firebase";
import Widget from '../../components/Widget/Widget';
import Swal from 'sweetalert2'
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

const DashboardPage = (props) => {

  const { history } = props;
  const classes = useStyles();
  const [max_val, Setmax] = useState("");
  const [maxData, SetmaxData] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  var max = 0;
  var cur = 0;

  // Communicate with firebase ***
  // get max value and current value ****
  db.collection("RT_data").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().max_val) { max = doc.data().max_val }
      if (doc.data().cur_val) { cur = doc.data().cur_val }

    });
    // Store items (max value , current value , notif ) locally ****
    localStorage.setItem("max", max)
    
    localStorage.setItem("cur", cur)
   // Store notif as 0 
    localStorage.setItem("notif", 0)

    if ((max - 20) <= cur) {

      localStorage.setItem("notif", 1)

    }
  });
 // Loading users
  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/pages/auth/login");
  }, [user, loading]);

 // ADD max value to firebase *****
  

  useEffect(() => {
    db.collection("RT_data").onSnapshot((snapshot) => {
      SetmaxData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    console.log({ maxData });
  }, []);



 // Get max value ***
  useEffect(() => {

    db.collection("RT_data").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  });




  const submit = (e) => {
    e.preventDefault();
    db.collection("RT_data").doc("max").set({
      max_val: max_val,

    });
    
    Setmax("");

  };
  
 

  return (
    <OftadehLayout >
      <center><h1 style={{ color: '#033EA4' }}>Dashboard</h1></center>

      <Grid container style={{ marginTop: "40px" }} >

        <Grid item xs={2} style={{ marginLeft: "50px" }} >

          <Paper className={classes.paper}>
            <Widget type='orders' />
          </Paper>
        </Grid>

        <Grid item xs={1} >


        </Grid>

        <Grid item xs={2} >

          <Paper className={classes.paper}>
            <Widget type='earnings' />

          </Paper>

        </Grid>
        <Grid item xs={1} >


        </Grid>
        <Grid item xs={2} >

          <Paper className={classes.paper}>
            <Widget type='balance' />
          </Paper>
        </Grid>

        <Grid item xs={1} >


        </Grid>

        <Grid item xs={2} >

          <Paper className={classes.paper}>
            <Widget type='users' />

          </Paper>

        </Grid>
      </Grid>








      <Grid container style={{ marginTop: "35px" , marginLeft:"90px" }}>

        <Grid item xs={4} >
          <center><h2 style={{ color: '#033EA4', textalign: "center" , fontStyle:"italic", fontSize:'22px' }}>Pourcentage des places disponibles </h2>
            <OftadehPieChart /></center>

        </Grid>

        <Typography className={classes.titlePaper} variant="h8">


          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
           
            <TextField id="outlined-basic" label="Nombre maximal des visiteurs" variant="outlined" 
            placeholder="Entrer le nombre maximal" 
            style={{ marginLeft: "300px",marginTop:"100px"}}
              type="number"
              value={max_val}
              
              onChange={(e) => Setmax(e.target.value)}
            />
           
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<SendIcon />} type="submit" style={{ marginLeft: "400px",marginTop:"19px", borderBlockColor: "black", }}
             onClick={submit} 
            >
              Send
            </Button>
          </Stack>
          

        </Typography>

      </Grid>


    </OftadehLayout>
  );
}



export default DashboardPage;
