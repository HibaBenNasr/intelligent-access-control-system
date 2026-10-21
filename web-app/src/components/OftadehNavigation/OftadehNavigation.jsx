import React, { useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import navigationConfig from "../../oftadeh-configs/navigationConfig";
import navigationConfigUser from "../../oftadeh-configs/navigationConfigUser";
import OftadehNavGroup from "./sections/OftadehNavGroup";
import OftadehNavCollapse from "./sections/OftadehNavCollapse";
import OftadehNavItem from "./sections/OftadehNavItem";
import OftadehNavLink from "./sections/OftadehNavLink";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { auth, db, logout } from "./../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  logoBg: {
    backgroundColor: theme.palette.type !== "dark" && "#18202c",
    // backgroundColor: "#18202c"
  },
  logo: {
    padding: "1rem",
    "& span": {
      display: "block",
      color: "rgba(41, 113, 245, 0.87)",
    },
  },
  navCustom: {
    "& .MuiTypography-root": {
      fontSize: ".85rem",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "35px",
    },
    "& .MuiCollapse-wrapperInner a": {
      paddingLeft: "50px",
    },
  },
}));

const OftadehNavigation = (props) => {
  const classes = useStyles(props);
  const [data, setData] = useState("");
  var admin = false;
  const [user, loading, error] = useAuthState(auth);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);


      const data = doc.docs[0].data();
      if (data.email === "admin@gmail.com") { admin = true }


    } catch (err) {

      // alert("An error occured while fetching user data");
    }
    let htm;
    localStorage.setItem('admin', admin);
    if (admin) {
      htm =
        navigationConfig.map((item) => (
          <React.Fragment key={item.id}>
            {item.type === "group" && <OftadehNavGroup item={item} />}

            {item.type === "collapse" && <OftadehNavCollapse item={item} />}

            {item.type === "item" && <OftadehNavItem item={item} />}

            {item.type === "link" && <OftadehNavLink item={item} />}

            {item.type === "divider" && <Divider className="my-16" />}
          </React.Fragment>
        ))





    }
    else {
      htm =
        navigationConfigUser.map((item) => (
          <React.Fragment key={item.id}>
            {item.type === "group" && <OftadehNavGroup item={item} />}

            {item.type === "collapse" && <OftadehNavCollapse item={item} />}

            {item.type === "item" && <OftadehNavItem item={item} />}

            {item.type === "link" && <OftadehNavLink item={item} />}

            {item.type === "divider" && <Divider className="my-16" />}
          </React.Fragment>
        ))
    }
    setData(htm)

  }
  useEffect(() => {
    if (loading) return;

    fetchUserName();
  }, [user, loading]);

  return (
    <div>
      <div className={clsx(classes.toolbar, classes.logoBg)}>
        <Typography
          className={classes.logo}
          variant="h6"
          component="h1"
          align="center"
        >

        </Typography>

      </div>
      <Divider />
      <List className={classes.navCustom}>
        {data}
      </List>
    </div>
  );
};

export default OftadehNavigation;
