import React, {Component} from 'react';

class DetailsRow extends Component{
    constructor(){
        super();
        this.state ={

        };
    }

    handleCheckBox = event => {
        let selectedStation = new Object();
        selectedStation.status = event.target.checked;
        selectedStation.id = this.props.orderNum;
        selectedStation.stationName = this.props.detail.stationName;
        if(this.props.detail.arrivalTime === '---'){
            selectedStation.timeStamp = this.props.detail.departureTimeDateObj;
        }else if (this.props.detail.departureTime = '---'){
            selectedStation.timeStamp = this.props.detail.arrivalTimeDateObj;
        }else{
            selectedStation.timeStamp = this.props.detail.arrivalTimeDateObj;
        }
        this.props.selectionHandler(selectedStation);
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