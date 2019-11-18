import React from 'react'

function Button(props) {
    //console.log(props);
    return (
        <button onClick={props.onClick}>
            Display train details
        </button>
    )
}

export default Button