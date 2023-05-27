import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphBox = (props) => {
    const data = props.dataWithDate
let newData
    if (Array.isArray(data) && data.length > 0) {

         newData =  data.map(obj => {
            const ISO = obj.time;
            const date = new Date(ISO);
            const hours = (date.getHours())            
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            console.log(hours, minutes, seconds, day, month, year)
            return   { time:`${hours}:${minutes}:${seconds} ${day}. ${month}. ${year}`, value:obj.value};
        })
        
    }

    console.log(newData);
    return (
        <div className="Graph">
            <h2>{props.title}</h2>
            <div className="graph-container" >
                <ResponsiveContainer height={300}>
                    <LineChart
                        data={newData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="time"
                            tick={false}
                            /> 
                        <YAxis />
                        <Tooltip /*formatter={tooltipFormatter}*/ />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
        </div>
    )
}

export default GraphBox;