import React, {Component} from 'react';

// import details row
import DetailsRow from '../DetailsRow/DetailsRow'
import Button from '../../Button/Button'

//
class DetailsTable extends Component{
    constructor(){
        super();
        this.state = {
            selectedRows:[],
            startingStation: "",
            endingStation: "",
            travelTime: ""
        };
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.processSelectedRows = this.processSelectedRows.bind(this);
        this.resetSelection = this.resetSelection.bind(this);
        this.saveSearch = this.saveSearch.bind(this);
    }

    saveSearch(){
        console.log(this.state.startingStation);
        console.log(this.state.endingStation);
        console.log(this.state.travelTime);
        console.log(this.props.userInfo);
    }

    handleRowSelection(obj){
        this.props.getSelectedStations(obj);    
        let selectedRowsArr = this.state.selectedRows;
        selectedRowsArr.push(obj);
        this.setState({selectedRows: selectedRowsArr});
    }

    processSelectedRows(){
        let rowsArr = this.state.selectedRows.slice();
        let idArr = [];
        let idArrUnique = [];
        let idArrElementNum = [];
        let idArrOddElements = [];
        let idArrOddFirstTwo = [];
        let rowsOddArrOfTwo = [];
        let refinedRowObjs = [];
        let timeDiff = 0;
        let hours = 0;
        let minutes = 0;
        let remainingMins = 0;
        let timeStr = "";
        
        for(var i=0; i<rowsArr.length; i++){
            idArr.push(rowsArr[i].id);
        }
        idArr.sort(function(a, b){
            return a - b;
        });
        for (var i=0; i<idArr.length; i++){
            if(idArr[i] !== idArr[i+1]){
                idArrUnique.push(idArr[i]);
            }
        }
        for(var i=0; i<idArrUnique.length; i++){
            let count = 0;
            for(var j=0; j<idArr.length; j++){
                if(idArrUnique[i] === idArr[j]){
                    count++;
                }
            }
            idArrElementNum.push(count);
        }
        for (var i=0; i<idArrElementNum.length; i++){
            if(idArrElementNum[i]%2 !== 0){
                idArrOddElements.push(idArrUnique[i]);
            }
        }
        if (idArrOddElements.length>2){
            alert(`You have selected ${idArrOddElements.length} stations. Max 2 stations can be selected. Please click Reset Selection to continue`);
        }
        if (idArrOddElements.length === 2){
            idArrOddFirstTwo.push(idArrOddElements[0]);
            idArrOddFirstTwo.push(idArrOddElements[1]);

        }
        for(var i=0; i<idArrOddFirstTwo.length; i++){
            for(var j=0; j<rowsArr.length; j++){
                if(idArrOddFirstTwo[i] === rowsArr[j].id && rowsArr[j].status){
                    rowsOddArrOfTwo.push(rowsArr[j]);
                }
            }
        }

        refinedRowObjs.push(rowsOddArrOfTwo[0]);
        refinedRowObjs.push(rowsOddArrOfTwo[rowsOddArrOfTwo.length-1]);
        timeDiff = (refinedRowObjs[1].timeStamp.getTime() - refinedRowObjs[0].timeStamp.getTime())/1000;
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
        this.setState({ startingStation: refinedRowObjs[0].stationName });
        this.setState({ endingStation: refinedRowObjs[1].stationName });
        this.setState({ travelTime: timeStr });     
    }

    resetSelection(){
        this.props.resetProcessor();
        this.setState({ startingStation: "" });
        this.setState({ endingStation: "" });
        this.setState({ travelTime: "" });
        this.setState({ selectedRows: [] });
    }

    render(){
        //console.log(this.props.userInfo);
        for (var i=0; i<this.props.stationDetails.length; i++){
            for(var j=0; j<this.props.stationsSelected.length; j++){
                if(this.props.stationDetails[i].id === this.props.stationsSelected[j].id){
                    this.props.stationDetails[i].checked = true;
                }
            }
            this.props.stationDetails[i].currentLength = this.props.stationDetails.length;
        }
        let detailRows = this.props.stationDetails.map(row => <DetailsRow detail={row} orderNum={row.id} selectionHandler={this.handleRowSelection} />);
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
                <Button className='displayButton' onClick={this.processSelectedRows} buttonText="Display travel time"/>
                <Button className='displayButton' onClick={this.resetSelection} buttonText="Reset Selection"/>
                <p className='displayTravelTime'>First station in selection list: {this.state.startingStation}</p>
                <p className='displayTravelTime'>Last station in selection list: {this.state.endingStation}</p>
                <p className='displayTravelTime'>Travel time between stations: {this.state.travelTime}</p>
                <p></p>
                <Button className='displayButton' onClick={this.saveSearch} buttonText="*Save Search"/>
                <p>*Requires Login</p>
           </div> 

        );
    }
}

export default DetailsTable