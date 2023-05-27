import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    { timestamp: 1678994955, temperature: 21.3 },
  { timestamp: 1678995555, temperature: 20.4 },
  { timestamp: 1678996155, temperature: 16.7 },
  { timestamp: 1678996755, temperature: 18.9 },
  { timestamp: 1678997355, temperature: 15.8 },
  { timestamp: 1678997955, temperature: 20.9 },
  { timestamp: 1678998555, temperature: 22.2 },
  { timestamp: 1678999155, temperature: 22.5 },
  { timestamp: 1678999755, temperature: 20.1 },
  { timestamp: 1679000355, temperature: 18.1 },
  { timestamp: 1679000955, temperature: 21.2 },
  { timestamp: 1679001555, temperature: 22.3 },
  { timestamp: 1679002155, temperature: 20.6 },
  { timestamp: 1679002755, temperature: 19.6 },
  { timestamp: 1679003355, temperature: 15.8 },
  { timestamp: 1679003955, temperature: 24.1 },
  { timestamp: 1679004555, temperature: 16.5 },
  { timestamp: 1679005155, temperature: 22.7 },
  { timestamp: 1679005755, temperature: 18.9 },
  { timestamp: 1679006355, temperature: 21.3 },
  { timestamp: 1679006955, temperature: 22.2 },
  { timestamp: 1679007555, temperature: 15.5 },
  { timestamp: 1679008155, temperature: 23.2 },
  { timestamp: 1679008755, temperature: 24.5 },
  { timestamp: 1679009355, temperature: 16.3 },
  { timestamp: 1679009955, temperature: 18.9 },
  { timestamp: 1679010555, temperature: 23.1 },
  { timestamp: 1679011155, temperature: 18.6 },
  { timestamp: 1679011755, temperature: 20.3 },
  { timestamp: 1679012355, temperature: 21.6 },
  { timestamp: 1679012955, temperature: 20.7 },
  { timestamp: 1679013555, temperature: 17.8 },
  { timestamp: 1679014155, temperature: 23.8 },
  { timestamp: 1679014755, temperature: 22.8 },
  { timestamp: 1679015355, temperature: 21.8 },
  { timestamp: 1679015955, temperature: 20.3 },
  { timestamp: 1679016555, temperature: 17.4 },
  { timestamp: 1679017155, temperature: 16.7 },
  { timestamp: 1679017755, temperature: 16.5 },
  { timestamp: 1679018355, temperature: 17.2 },
  { timestamp: 1679018955, temperature: 22.9 },
  { timestamp: 1679019555, temperature: 18.3 },
  { timestamp: 1679020155, temperature: 21.9 },
  { timestamp: 1679020755, temperature: 18.9 },
  { timestamp: 1679021355, temperature: 23.1 },
  { timestamp: 1679021955, temperature: 24.5 },
  { timestamp: 1679022555, temperature: 19.6 },
  { timestamp: 1679023155, temperature: 23.7 },
  { timestamp: 1679023755, temperature: 19.3 },
  { timestamp: 1679024355, temperature: 21.8 },
  { timestamp: 1679024955, temperature: 20.6 },
  { timestamp: 1679025555, temperature: 22.5 },
  { timestamp: 1679026155, temperature: 23.1 },
  { timestamp: 1679026755, temperature: 20.5 },
  { timestamp: 1679027355, temperature: 17.5 },
  { timestamp: 1679027955, temperature: 23.7 },
  { timestamp: 1679028555, temperature: 20.9 },
  { timestamp: 1679029155, temperature: 22.1 },
  { timestamp: 1679029755, temperature: 19.1 },
  { timestamp: 1679030355, temperature: 23.2 },
  { timestamp: 1679030955, temperature: 20.4 },
  { timestamp: 1679031555, temperature: 15.6 },
  { timestamp: 1679032155, temperature: 16.2 },
  { timestamp: 1679032755, temperature: 21.5 },
  { timestamp: 1679033355, temperature: 19.3 },
  { timestamp: 1679033955, temperature: 23.5 },
  { timestamp: 1679034555, temperature: 22.2 },
  { timestamp: 1679035155, temperature: 15.7 },
  { timestamp: 1679035755, temperature: 21.8 },
  { timestamp: 1679036355, temperature: 16.6 },
  { timestamp: 1679036955, temperature: 18.8 },
  { timestamp: 1679037555, temperature: 17.9 },
  { timestamp: 1679038155, temperature: 23.6 },
  { timestamp: 1679038755, temperature: 16.3 },
  { timestamp: 1679039355, temperature: 24.3 },
  { timestamp: 1679039955, temperature: 20.7 },
  { timestamp: 1679040555, temperature: 23.4 },
  { timestamp: 1679041155, temperature: 22.1 },
  { timestamp: 1679041755, temperature: 21.3 },
  { timestamp: 1679042355, temperature: 17.9 },
  { timestamp: 1679042955, temperature: 24.5 },
  { timestamp: 1679043555, temperature: 18.7 },
  { timestamp: 1679044155, temperature: 20.6 },
  { timestamp: 1679044755, temperature: 23.2 }
]

const dataWithDate = data.map(item => {
    const dateObj = new Date(item.timestamp * 1000);
    const date = dateObj.toLocaleString();
    const day = dateObj.toLocaleDateString();
  
    return {
      ...item,
      date: date,
      day: day
    };
});


const GraphBox = (props) => {
    return (
        <div className="Graph">
            <h2>{props.title}</h2>
            <div className="graph-container" >
                <ResponsiveContainer height={300}>
                    <LineChart
                        data={props.dataWithDate}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="time"
                            tick={false}
                            /> 
                        <YAxis />
                        <Tooltip /*formatter={tooltipFormatter}*/ />
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
        </div>
    )
}

export default GraphBox;