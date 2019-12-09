import React, {Component} from 'react';

// import details row
import DetailsRow from '../DetailsRow/DetailsRow'
import Button from '../../Button/Button'

//
class DetailsTable extends Component{
    constructor(){
        super();
        this.state = {
            stationDetailsWTime: [],
            selectedRows:[],
            startingStation: "",
            endingStation: "",
            travelTime: ""
        };
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.processSelectedRows = this.processSelectedRows.bind(this);
    }

    updateStationDetails(timeArr, detailsArr, timeDatesObjs){
        let newDetailsArr = [];
        for(var i=0; i<detailsArr.length; i++){
            let newDetailsArrObj = new Object();
            let timeStr = undefined;
            if(timeArr[i].hours === undefined){
                timeStr = '---';
            }else{
                timeStr = `${timeArr[i].hours} : ${timeArr[i].minutes}`;
            }
            newDetailsArrObj.id = i;
            newDetailsArrObj.stationName = detailsArr[i].stationName;
            newDetailsArrObj.arrivalTime = detailsArr[i].arrivalTime;
            newDetailsArrObj.arrivalTimeDateObj = timeDatesObjs[i].arrivalTime;
            newDetailsArrObj.departureTime = detailsArr[i].departureTime;
            newDetailsArrObj.departureTimeDateObj = timeDatesObjs[i].departureTime;
            newDetailsArrObj.stayTimeSec = timeArr[i].seconds;
            newDetailsArrObj.stayTimeHM = timeStr;
            newDetailsArrObj.trackNum = detailsArr[i].trackNum;
            newDetailsArr.push(newDetailsArrObj);
        }
        this.setState({ stationDetailsWTime: newDetailsArr })
    }

    calculateIntervals(timeDates, stationDetails){
        console.log("data processing started in DetailsTable component");
        let timeDiffsArr = [];
        for (var i=0; i<timeDates.length; i++){
            if(timeDates[i].arrivalTime === '---' || timeDates[i].departureTime === '---'){
                timeDiffsArr.push('---');
            }else{
                let milliSecDiff = undefined;
                let secDiff = undefined;
                let minDiff = 0;
                let hourDiff = 0;
                let timeDiffsArrObj = new Object();
                
                milliSecDiff = timeDates[i].departureTime.getTime()-timeDates[i].arrivalTime.getTime();
                secDiff = milliSecDiff/1000;
                timeDiffsArrObj.seconds = secDiff;
                if(secDiff>60){
                    minDiff = Math.floor(secDiff/60);
                }
                if(minDiff>60){
                    hourDiff = Math.floor(minDiff/60);
                }
                timeDiffsArrObj.hours = hourDiff;
                timeDiffsArrObj.minutes = minDiff;
                timeDiffsArr.push(timeDiffsArrObj);
            }
        }
        this.updateStationDetails(timeDiffsArr, stationDetails, timeDates);
    }

    handleRowSelection(obj){    
        let selectedRowsArr = this.state.selectedRows;
        selectedRowsArr.push(obj);
        this.setState({selectedRows: selectedRowsArr});
    }

    processSelectedRows(){
        let rowsArr = this.state.selectedRows.slice();
        let trueRowsArr = [];
        let idArr = [];
        let firstAndLastId = [];
        let firstAndLastIdObjs = [];
        let firstAndLastObjs = [];
        let timeDiff = 0;
        let hours = 0;
        let minutes = 0;
        let remainingMins = 0;
        let timeStr = "";
        for (var i=0; i<rowsArr.length; i++){
            if(rowsArr[i].status === true){
                trueRowsArr.push(rowsArr[i]);
            }
        }
        for(var i=0; i<trueRowsArr.length; i++){
            idArr.push(rowsArr[i].id);
        }
        idArr.sort(function(a, b){
            return a - b;
        });
        firstAndLastId.push(idArr[0]);
        firstAndLastId.push(idArr[trueRowsArr.length-1]);
        for(var i=0; i<firstAndLastId.length; i++){
            for(var j=0; j<trueRowsArr.length; j++){
                if(firstAndLastId[i] === trueRowsArr[j].id){
                    firstAndLastIdObjs.push(trueRowsArr[j]);
                }
            }
        }
        firstAndLastObjs.push(firstAndLastIdObjs[0]);
        firstAndLastObjs.push(firstAndLastIdObjs[firstAndLastIdObjs.length-1]);
        timeDiff = (firstAndLastObjs[1].timeStamp.getTime() - firstAndLastIdObjs[0].timeStamp.getTime())/1000;
        if(timeDiff>60){
            minutes = Math.floor(timeDiff/60);
        }
        if(minutes>60){
            hours = Math.floor(minutes/60);
            remainingMins = Math.floor(minutes%60);
        }
        if(hours === 0){
            timeStr = `${minutes} minutes`;
        }else{
            timeStr = `${hours} hours and ${remainingMins} minutes`;
        }
        console.log(firstAndLastObjs);
        this.setState({ startingStation: firstAndLastObjs[0].stationName });
        this.setState({ endingStation: firstAndLastObjs[1].stationName });
        this.setState({ travelTime: timeStr });
    }

    componentDidUpdate(prevProps){
        if(this.props.stationDetails.length !== prevProps.stationDetails.length){
            this.calculateIntervals(this.props.timeDates, this.props.stationDetails);
        }
    }

    render(){
        const detailRows = this.state.stationDetailsWTime.map(row => <DetailsRow detail={row} orderNum={row.id} selectionHandler={this.handleRowSelection} />);
        return(
            <div> 
                <table className='table-style'>
                    <thead>
                        <th>Select</th>
                        <th>Station Name</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                        <th>Stay Time (Seconds)</th>
                        <th>Stay Time (HH:MM)</th>
                        <th>Track Number</th>
                    </thead>
                    <tbody> {detailRows} </tbody>
                </table>
                <p></p>
                <Button onClick={this.processSelectedRows} buttonText="Display travel time"/>
                <p>First station in selection list: {this.state.startingStation}</p>
                <p>Last station in selection list: {this.state.endingStation}</p>
                <p>Travel time between stations: {this.state.travelTime}</p>
           </div> 

        );
    }
}

export default DetailsTable