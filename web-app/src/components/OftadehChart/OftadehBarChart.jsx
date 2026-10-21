import React, { Component } from "react";
import { db } from './../../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
//import maxData from '';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "JAN",
    visitors: 0,
  },
  {
    name: "FEB",
    visitors: 0,
  },
  {
    name: "MAR",
    visitors: 0,
  },
  {
    name: "APR",
    visitors: 0,
  },
  {
    name: "MAY",
    visitors: 0,
  },
  {
    name: "JUN",
    visitors: 0,
  },
  {
    name: "JUL",
    visitors: 0,
  },
  {
    name: "AUG",
    visitors: 0,
  },
  {
    name: "SEP",
    visitors: 0,
  },
  {
    name: "OCT",
    visitors: 0,
  },
  {
    name: "NOV",
    visitors: 0,
  },
  {
    name: "DEC",
    visitors: 0,
  },
];




export default class OftadehBarChart extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/q4eonc12/";




  groupByTimePeriod(obj, timestamp, period) {
    var objPeriod = {};
    var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    for (var i = 0; i < obj.length; i++) {
      var d = new Date(obj[i][timestamp] * 1000);
      if (period == 'day') {
        d = Math.floor(d.getTime() / oneDay);
      } else if (period == 'week') {
        d = Math.floor(d.getTime() / (oneDay * 7));
      } else if (period == 'month') {
        d = (d.getFullYear() - 1970) * 12 + d.getMonth();
      } else if (period == 'year') {
        d = d.getFullYear();
      } else {
        console.log('groupByTimePeriod: You have to set a period! day | week | month | year');
      }
      // define object key
      objPeriod[d] = objPeriod[d] || [];
      objPeriod[d].push(obj[i]);
    }
    return objPeriod;
  };
  constructor(props) {
    super(props);
    this.state = { data: [] }
  }
  //Fetch data in componentDidMount
  componentDidMount() {


    db.collection("Entree").get().then((querySnapshot) => {

      // Loop through the data and store
      // place it in array to display


      const allList = [];
      var index = 1
      querySnapshot.forEach(element => {
        try {
          var dataFireStore = element.data();


          allList.push({ id: index, date: dataFireStore.date.seconds })
          index += 1
        } catch (error) {
          console.log("Error: " + error);
          var dataFireStore = element.data();


        }


      });

      const month_list = this.groupByTimePeriod(allList, 'date', 'month')
      //console.log(month_list)
      Object.keys(month_list).forEach(key => {
        data[key - 624]['visitors'] = month_list[key].length
      })



//  store the data in state
      this.setState({ data: data })
    })

  }















  render() {


    return (
      // console.log(this.state.data),
      <div id="barr" style={{ width: "99%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={this.state.data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
            barSize={(60)}
            stroke="#D2ED5F"
          >
           
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 40, right: 10 }}
            />
            <YAxis type="number" />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="visitors" fill="#3B1CE0" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }




}

