import React from 'react'

function Button(props) {
    //console.log(props);
    return (
        <button onClick={props.onClick}>
            {props.buttonText}
        </button>
    )
}

export default Button