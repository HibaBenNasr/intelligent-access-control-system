import { Button, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";
import { auth, db } from '../../firebase';
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

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


function createData(Id, Name, Email) {
  return { Id, Name, Email };
}

let rows = [];

const ListeUsers = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const { history } = props;
  const [data, setData] = useState("");
  const classes = useStyles();

  let datalist = []

  // Fetch name from firebase ****
  const fetchUserName = async () => {
    try {

      const users = db.collection('users');
      const snapshot = await users.get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach(doc => {
        let data = doc.data();
        datalist.push(createData(data.uid, data.name, data.email))

      });
    } catch (err) {

    }
// Store user's number locally ****
    localStorage.setItem("nbuser", datalist.length)

    rows = datalist
    let htm = <TableContainer>
      <Table
        className={classes.table}
        style={{ tableLayout: "fixed" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.Id}>
              <TableCell component="th" scope="row">
                {row.Id}
              </TableCell>
              <TableCell >{row.Name}</TableCell>
              <TableCell>{row.Email}</TableCell>
              

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>;

    setData(htm)


  };



  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/pages/auth/login");
    fetchUserName();
    setTimeout(() => {
      rows = rows;
    }, 1000);
  }, [user, loading]);

  return (
    <OftadehLayout>
      <h1>Users List</h1>
      {data}
    </OftadehLayout>
  );
}

export default ListeUsers;
