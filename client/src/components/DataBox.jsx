import React from "react";

const DataBox = (props) => {
    return (
        <div className="Box">
            <div className="header" >
                <h2>{props.title}</h2>
                <img className="img" src={props.img} alt={props.imgAlt} />
            </div>
            <div className="data">
                <h1>{props.data}{props.unit}</h1>
            </div>
        </div>
    )
}

export default DataBox;