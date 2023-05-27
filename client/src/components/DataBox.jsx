import React from "react";

const DataBox = (props) => {
    return (
        <div className="Box" style={{backgroundColor:`rgb(${props.color})`}}>
            <div className="header" >
                <h2><b>{props.title}</b></h2>
                <img className="img" src={props.img} alt={props.imgAlt} />
            </div>
            {props.status == 'OK'? 
            <div className="data">
                <h1>{props.status}</h1>
            </div>
            :
            <div className="data">
                <h1>{props.data}{props.unit}</h1>
            </div>
            }
        </div>
    )
}

export default DataBox;