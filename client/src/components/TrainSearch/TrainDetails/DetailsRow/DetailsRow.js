import React from 'react';

// displaying rows with stateless const class
const DetailsRow = (props) => (
    <tr>
        <td> {props.detail.stationId} </td>
        <td> {props.detail.arrivalTime} </td>
        <td> {props.detail.departureTime} </td>
        <td> {props.detail.trackNum} </td>
    </tr>
);

export default DetailsRow