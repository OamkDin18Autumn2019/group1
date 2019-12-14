import React, {Component} from 'react';

class DetailsRow extends Component{
    constructor(props){
        super(props);
        this.state ={
            checked: this.props.detail.checked,
        };
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    handleCheckBox = event => {

        let selectedStation = new Object();
        let status = event.target.checked;
        selectedStation.status = status;
        selectedStation.id = this.props.orderNum;
        selectedStation.stationName = this.props.detail.stationName;
        if(this.props.detail.arrivalTime === "---"){
            selectedStation.timeStamp = this.props.detail.departureTimeDateObj;
        } else {
            selectedStation.timeStamp = this.props.detail.arrivalTimeDateObj;
        }
        this.props.selectionHandler(selectedStation);
        if(this.props.detail.fullLength === this.props.detail.currentLength){
            this.setState({checked: status});
        }else{
            this.setState({checked: !status});
        }
    }

    render(){
        let checkBox = undefined;
        if(this.props.detail.stayTimeSec !== 0){
            checkBox = <input type="checkbox" onChange={this.handleCheckBox} checked={this.state.checked} />;
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