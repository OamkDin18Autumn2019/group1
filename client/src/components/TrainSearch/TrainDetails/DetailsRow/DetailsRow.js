import React, {Component} from 'react';

class DetailsRow extends Component{
    constructor(){
        super();
        this.state ={
            checked: false
        };
    }

    handleCheckBox = event => {
        this.setState({ checked: event.target.checked });
        let selectedStation = new Object();
        selectedStation.status = this.state.checked;
        selectedStation.stationName = this.props.detail.stationName;
        selectedStation.arrivalTime = this.props.detail.arrivalTime;
        console.log(selectedStation);
    }

    render(){
        let checkBox = undefined;
        if(this.props.detail.stayTimeSec !== 0){
            checkBox = <input type="checkbox" onChange={this.handleCheckBox} />;
        }else{
            checkBox = "---";
        }
        return(
            <tr>
                <td> {checkBox} </td> 
                <td> {this.props.detail.stationName} </td>
                <td> {this.props.detail.arrivalTime} </td>
                <td> {this.props.detail.departureTime} </td>
                <td> {this.props.detail.stayTimeSec} </td>
                <td> {this.props.detail.stayTimeHM} </td>
                <td> {this.props.detail.trackNum} </td>
            </tr>
        );
    }
}

export default DetailsRow