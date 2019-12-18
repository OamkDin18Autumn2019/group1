import React from 'react'

function StationSearch(props) {
    return (
        <input 
            type="text" 
            name="stationSeach" 
            placeholder="Filter stations..."
            value={props.value}
            onChange={props.handleInputChange}
        />
    )
}

export default StationSearch