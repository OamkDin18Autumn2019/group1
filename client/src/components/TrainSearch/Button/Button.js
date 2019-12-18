import React from 'react'

function Button(props) {
    //console.log(props);
    return (
        <button className='displayButton' onClick={props.onClick}>
            {props.buttonText}
        </button>
    )
}

export default Button