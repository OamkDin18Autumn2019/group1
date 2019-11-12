import React from 'react'

function Input(props) {
    return (
        <input 
            type="text" 
            placeholder="Search for..." 
            value={props.query} 
            onChange={props.handleInputChange} 
        />
    )
}

export default Input