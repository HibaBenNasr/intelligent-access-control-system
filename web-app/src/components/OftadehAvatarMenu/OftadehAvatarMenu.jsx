import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  ListItemIcon,
  Hidden
} from "@material-ui/core";

import OftadehAvatarBadge from "../OftadehAvatarBadge/OftadehAvatarBadge";
import { AccountCircle, Settings, ExitToApp } from "@material-ui/icons";
import { auth, db, logout } from "./../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  },
  menuIcon: {
    minWidth: "33px"
  },
  paddingRightZero: {
    paddingRight: 0
  }
}));

const OftadehAvatarMenu = props => {
  const classes = useStyles(props);
  

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
 
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);

      
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
     
     // alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
   
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      <ListItem
        button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        alignItems="flex-start"
        className={classes.paddingRightZero}
      >
        <ListItemAvatar>
          <OftadehAvatarBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            variant="dot"
          >
            <Avatar
              alt="Bedoui Mejda"
              //src= "https://material-ui.com/static/images/avatar/3.jpg"
            />
          </OftadehAvatarBadge>
        </ListItemAvatar>
        <Hidden implementation="css" smDown>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography component="span" variant="subtitle2">
                  {name}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.inline}
                  color="textPrimary"
                >
                 
                </Typography>
              </React.Fragment>
            }
          />
        </Hidden>
      </ListItem>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                 
                  <MenuItem onClick={logout}>
                    <ListItemIcon className={classes.menuIcon}>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

OftadehAvatarMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any
};

export default OftadehAvatarMenu;
