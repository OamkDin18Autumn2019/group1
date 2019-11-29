import React from 'react';

// import details row
import DetailsRow from '../DetailsRow/DetailsRow'

//
function DetailsTable(props) {
    const detailRows = props.stationDetails.map(row => <DetailsRow detail={row} />);
    
    return(
        <table className='table-style'>
            <thead>
                <th>Station Name</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Track Number</th>
            </thead>
            <tbody> {detailRows} </tbody>
        </table>
    );
}

export default DetailsTable