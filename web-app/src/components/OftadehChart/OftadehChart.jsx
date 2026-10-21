import React, { Component, useState } from "react";
import { Typography } from "@material-ui/core";
import { db } from './../../firebase';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

let data = [
  {
    name: "7:00",
    visitors: 0,
  },
  {
    name: "8:00",
    visitors: 0,
  },
  {
    name: "9:00",
    visitors: 0,
  },
  {
    name: "10:00",
    visitors: 0,
  },
  {
    name: "11:00",
    visitors: 0,
  },
  {
    name: "12:00",
    visitors: 0,
  },
  {
    name: "13:00",
    visitors: 0,
  },
  {
    name: "14:00",
    visitors: 0,
  },
  {
    name: "15:00",
    visitors: 0,
  },
  {
    name: "16:00",
    visitors: 0,
  },
  {
    name: "17:00",
    visitors: 0,
  },
  {
    name: "18:00",
    visitors: 0,
  },
  {
    name: "19:00",
    visitors: 0,
  },

]

export default class OftadehChart extends Component {
  static demoUrl = 'https://codesandbox.io/s/tiny-line-chart-r5z0f';


  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      data: []
    }
    

  }
 

  
//Fetch data in componentDidMount
  componentDidMount() {

   
    db.collection("Entree").get().then((querySnapshot) => {

      // Loop through the data and store
      // it in array to display
      querySnapshot.forEach(element => {
        var dataFireStore = element.data();
        // console.log(dataFireStore)
        // console.log(data)
        var ts = dataFireStore.date?.seconds;
        var today = new Date().setHours(0, 0, 0, 0) / 1000;
        
        var thatDay = new Date(ts * 1000).setHours(0, 0, 0, 0) / 1000;
        //console.log(today )
        // console.log(thatDay)
        
      
        if (today === thatDay) {

          var h = "" + new Date(ts * 1000).getHours() + ":00";
          //console.log(h)
          for (var i = 0; i <= data.length - 1; i++) {
            // console.log(data[i].name)
            if (data[i].name == h) {

              data[i].visitors = data[i].visitors + 1;
              

            }
            
          }

        }

        

      });


      this.setState({ data: data })
     
    })

  }


  render() {
    return (

      <div style={{ width: "99%", height: 300 }}>
       
        <ResponsiveContainer>

          <AreaChart
            data={this.state.data}
            width={300} height={100} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
             
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" scale="point"/>
            <YAxis  interval="preserveEnd" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#EEB0B0"
              
              strokeWidth={4}
              
            />

           
          </AreaChart>

        </ResponsiveContainer>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import { Line } from "react-chartjs-2";

// class OftadehChart extends Component {
//   state = {
//     data: {
//       labels: [
//         "JAN",
//         "FEB",
//         "MAR",
//         "APR",
//         "MAY",
//         "JUN",
//         "JUL",
//         "AUG",
//         "SEP",
//         "OCT",
//         "NOV",
//         "DEC"
//       ],
//       datasets: [
//         {
//           label: "# of Votes",
//           data: [12, 19, 3, 5, 2, 24, 12, 19, 31, 30, 12, 3],
//           backgroundColor: "rgba(255, 99, 132, 0.2)",
//           borderColor: "rgba(255, 99, 132, 1)",
//           borderWidth: 3
//         }
//       ]
//     }
//   };

//   render() {
//     return (
//       <>
//         {/* <div style={{ width: "50%", height: "90%" }}> */}
//         <Line
//           data={this.state.data}
//           // width={50}
//           height={55}
//           options={{
//             responsive: true,
//             maintainAspectRatio: true,
//             legend: {
//               display: false
//             },
//             scales: {
//               xAxes: [
//                 {
//                   gridLines: {
//                     display: false
//                   }
//                 }
//               ]
//             }
//           }}
//         />
//       </>
//     );
//   }
// }

// export default OftadehChart;
