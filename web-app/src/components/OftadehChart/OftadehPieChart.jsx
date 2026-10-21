import React, { Component } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Les places disponibles", value: (localStorage.getItem("max") - localStorage.getItem("cur")) * 100 },
  { name: "Le nombre actuel", value: (localStorage.getItem("cur")) * 100 },
];

const COLORS = ['green', 'blue'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white"
     textAnchor={x > cx ? 'start' : 'end'}
     dominantBaseline="central"
     >
    {`${(percent * 100).toFixed(0)}%`}
  </text>
);
};

export default class OftadehPieChart extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";

  render() {
    return (
      <div style={{ width: "99%", height: 300 }}>
        <ResponsiveContainer>

          <PieChart width={700} height={900}>
            <Legend layout="vertical" verticalAlign="bottom" style={{ marginTop :"7x"}}/>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

