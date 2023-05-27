import React from "react";

const AlertBox = (props) => {
    const {title,id} = props
    return (
        <div className="Alerts">
            <h2>{title}</h2>
            <h2>{id}</h2>
            
        </div>
    )
}

export default AlertBox;