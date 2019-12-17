import React from 'react'

function StationSearch(props) {
    return (
        <div className="tableRow">
        <input     
            type="text" 
            name="stationSeach" 
            placeholder="Filter stations..."
            value={props.value}
            onChange={props.handleInputChange}
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        </div>
    )
    
}

export default StationSearch