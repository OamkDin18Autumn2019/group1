import React, {Component} from 'react';

const DetailsRow = (props) => (
    <tr>
        <td> {props.detail.stationId} </td>
        <td> {props.detail.arrivalTime} </td>
        <td> {props.detail.departureTime} </td>
        <td> {props.detail.trackNum} </td>
    </tr>
);

function DetailsTable(props) {
    const detailRows = props.details.map(row => <DetailsRow detail={row} />);
    return(
        <table className='table-style'>
            <thead>
                <th>Station ID</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Track Number</th>
            </thead>
            <tbody> {detailRows} </tbody>
        </table>
    );
}

class DetailsView extends Component{

    constructor(){
        super();
        this.state = { details: [] };
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        let details = [
            {
                stationId: "Oulu",
                arrivalTime: "09:30AM",
                departureTime: "10:00AM",
                trackNum: "3",
            },
            {
                stationId: "Kiiminki",
                arrivalTime: "12:00PM",
                departureTime: "12:30PM",
                trackNum: "3",
            },
        ];
        this.setState({ details: details });
    }

    render(){
        return(
            <div>
                <DetailsTable details={this.state.details} />
            </div>
        );
    }
}

export default DetailsView