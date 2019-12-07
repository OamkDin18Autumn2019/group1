import React from 'react';

// displaying rows with stateless const class
const DetailsRow = (props) => (
    <tr>
        <td> {props.detail.stationName} </td>
        <td> {props.detail.arrivalTime} </td>
        <td> {props.detail.departureTime} </td>
        <td> {props.detail.stayTimeSec} </td>
        <td> {props.detail.stayTimeHM} </td>
        <td> {props.detail.trackNum} </td>
    </tr>
);

export default DetailsRow