import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GraphBox = (props) => {
  const data = props.dataWithDate;
  let newData;

  const dataTime = [
    { time: "12:00", value: 20 },
    { time: "13:00", value: 30 },
    { time: "14:00", value: 25 },
    // další data...
  ];
  if (Array.isArray(data) && data.length > 0) {
    newData = data.map((obj) => {
      const ISO = obj.time;
      const date = new Date(ISO);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return {
        time: `${hours}:${minutes}:${seconds} - ${day}. ${month}. ${year}`,
        value: obj.value,
      };
    });
  }

  return (
    <div className="Graph">
      <h2>{props.title}</h2>
      <div className="graph-container">
        <ResponsiveContainer height={300}>
          <LineChart
            data={newData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={false} />
            <YAxis />
            <Tooltip /*formatter={tooltipFormatter}*/ />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphBox;
