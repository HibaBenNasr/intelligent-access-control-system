
import { makeStyles, Typography, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { auth, logInWithEmailAndPassword , signInWithGoogle } from "./../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const useStyles = makeStyles(theme => ({
  root: {
    background: "#0d131d",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  mBottom: {
    marginBottom: ".5rem"
  },
  button: {
    marginTop: ".85rem"
  },
  loginCard: {
    width: "275px",
    borderRadius: 5,
    background: "#fff",
    padding: ".85rem"
  }
}));

const LoginPage = props => {
  const classes = useStyles();
  const { history } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.push("/dash");
  }, [user, loading]);

  return (
    <div className={classes.root}>
      <div className={classes.loginCard}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
      
        <Typography className={classes.mBottom} variant="body1">
          Sign In to your account
        </Typography>
        <form noValidate autoComplete="off">
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
          />
          <TextField
            size="small"
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            onClick={() => history.push("/pages/auth/forgot-password")}
            color="primary"
          >
            Forgot password?
          </Button>
          <div className={classes.mBottom}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              onClick={() => logInWithEmailAndPassword (email, password)}
            >
              Login
            </Button>
            
          </div>
          
           <div className={classes.mBottom}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              onClick={signInWithGoogle}
            >
             Login with Google
            </Button>
          
          </div> 
          
        </form>
        
      </div>
      
    </div>
  );
};

export default LoginPage;
