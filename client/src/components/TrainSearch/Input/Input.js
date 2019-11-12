import React from 'react'

function Input(props) {
    return (
        <input 
            type="text" 
            placeholder="Search for..." 
            value={props.query} 
            onChange={props.onChange} 
        />
    )
}

export default Input