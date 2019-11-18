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

    loadData(val){
        let details = [];
        let detailsObj = undefined;
        let stations = [];
        let trainNum = val;
        fetch(`https://rata.digitraffic.fi/api/v1/trains/latest/${trainNum}`)
        .then(response => response.json())
        .then(data => {
                stations = data[0].timeTableRows;
                for (var i=0; i<stations.length; i++) {
                    detailsObj = {
                        stationId: stations[i].stationShortCode,
                        arrivalTime: stations[i].type,
                        departureTime: stations[i].scheduledTime,
                        trackNum: stations[i].commercialTrack,
                    };
                    details.push(detailsObj);
                }
                this.setState({ details: details });
            }    
        );
    }
    
    componentDidMount(){
        console.log(this.props.trainNum);
    }

    componentDidUpdate(prevProps){
        if(this.props.trainNum !== prevProps.trainNum){
            this.loadData(this.props.trainNum);
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