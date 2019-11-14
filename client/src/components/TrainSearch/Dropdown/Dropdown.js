import React from 'react'

function Dropdown(props) {
    console.log(props.data)
    return (
        <select value={props.select} onChange={props.onChange}>
            <option value="destination">Destination</option>
        </select>
    )
}

export default Dropdown