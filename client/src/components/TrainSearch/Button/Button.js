import React from 'react'

function Button(props) {
    //console.log(props);
    return (
        <button className="displayTableButton" onClick={props.onClick}>
            Display train details
        </button>
    )
}

export default Button