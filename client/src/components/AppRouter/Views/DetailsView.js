import React, {Component} from 'react';

// displaying rows with stateless const class
const DetailsRow = (props) => (
    <tr>
        <td> {props.detail.stationId} </td>
        <td> {props.detail.arrivalTime} </td>
        <td> {props.detail.departureTime} </td>
        <td> {props.detail.trackNum} </td>
    </tr>
);

//
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
        this.state = { 
            details: [],
         };        
    }
    
    componentDidMount(){
        //console.log(this.state.trainNum);
        this.loadData(22);
    }

    loadData(val){
        let details = [];
        let detailsObj = undefined;
        let stations = [];
        let trainNum = val;
        if (Number.isInteger(trainNum)){
            console.log(trainNum);
            fetch(`https://rata.digitraffic.fi/api/v1/trains/latest/${trainNum}`)
            .then(response => response.json())
            .then(data => {
                    stations = data[0].timeTableRows;
                    detailsObj = {
                        stationId: stations[0].stationShortCode,
                        arrivalTime: stations[0].type,
                        departureTime: stations[0].scheduledTime,
                        trackNum: stations[0].commercialTrack,
                    };
                    details.push(detailsObj);
                    this.setState({ details: details });
                }    
            );
        }

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