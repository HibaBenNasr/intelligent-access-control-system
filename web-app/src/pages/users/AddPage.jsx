
import { makeStyles, Typography, Button, TextField, Grid, Paper } from "@material-ui/core";
import Swal from 'sweetalert2'
//import PeopleIcon from '@mui/icons-material/PeopleOutlined';

import React, { useState, useRef } from 'react';
import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";
import { registerWithEmailAndPassword, } from '../../firebase';
import emailjs, { init } from "@emailjs/browser";

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

const AddPage = (props) => {
  const { history } = props;
  const classes = useStyles();
  
  // Initialization  ****
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

 // User register *****
  const register = () => {
    if (!name) 
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Please enter name",
      showConfirmButton: false,
      timer: 1500
    });
    if (!email) 
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Please enter email",
      showConfirmButton: false,
      timer: 1500
    });
    if (!password) 

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Please enter password",
      showConfirmButton: false,
      timer: 1500
    });
   // Register fonction appel ****
    registerWithEmailAndPassword(name, email, password);

    Swal.fire({
      title: 'Are you sure to add this user ?',
     
      showCancelButton: true,
      confirmButtonText: 'yes, add it ! ',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      
     
    }).then((result) => {
      
      if (result.isConfirmed) {
        history.push("/pages/users/ListeUsers");
      } 
    })
   
  };

// Send email via (EmailJS) to user that contains email and password ****
  init("_qpF4q9dLfu7-cx2F");
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm("gmail", "template_a6t8etc", form.current, "_qpF4q9dLfu7-cx2F").then(
      (result) => {
        Swal.fire({
          icon: 'success',
          position: 'top-end',
          
          title: "Message Sent Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        

        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <OftadehLayout>
      <h1 style={{ marginLeft: "300px" }} >Add new admin</h1>
      <Grid item xs={8}  >
        <Paper className={classes.paddingPaper} variant="outlined">
          

          <form ref={form}  >
            <TextField
              size="small"
              placeholder="user@example.com"
              variant="outlined"
              margin="dense"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              name="email"
            />
            <TextField style={{  marginTop:"20px" }}
              size="small"
              placeholder="Full Name "
              variant="outlined"
              margin="dense"
              type="email"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              name="name"
            />
            <TextField style={{  marginTop:"20px" }}
              size="small"
              label="Password"
              type="password"
              variant="outlined"
              margin="dense"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              name="password"
            />

            <Grid item xs={8} >
              <div className={classes.mBottom} style={{ marginLeft: "10px", marginTop:"20px" }}>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={register}
                  className={classes.button}
                >
                  ADD
                </Button>
                
                 <Button style={{ marginLeft: "20px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.button}
                >
                  Send Email
                </Button> 
                
              </div>
            </Grid>
          </form>
        </Paper>
      </Grid>



    </OftadehLayout >
  );
}

export default AddPage;
