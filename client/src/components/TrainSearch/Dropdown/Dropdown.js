import React from 'react'

function Dropdown(props) {
    return (
        <select value={props.select} onChange={props.onChange}>
            <option value="destination">Destination</option>
            <option value="number">Number</option>
        </select>
    )
}

export default Dropdown