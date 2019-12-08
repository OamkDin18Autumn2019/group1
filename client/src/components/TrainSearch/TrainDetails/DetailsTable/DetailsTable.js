import React, {Component} from 'react';

// import details row
import DetailsRow from '../DetailsRow/DetailsRow'

//
class DetailsTable extends Component{
    constructor(){
        super();
        this.state = {
            stationDetailsWTime: [],
        };
    }

    updateStationDetails(timeArr, detailsArr){
        let newDetailsArr = [];
        for(var i=0; i<detailsArr.length; i++){
            let newDetailsArrObj = new Object();
            let timeStr = undefined;
            if(timeArr[i].hours === undefined){
                timeStr = '---';
            }else{
                timeStr = `${timeArr[i].hours} : ${timeArr[i].minutes}`;
            }
            newDetailsArrObj.stationName = detailsArr[i].stationName;
            newDetailsArrObj.arrivalTime = detailsArr[i].arrivalTime;
            newDetailsArrObj.departureTime = detailsArr[i].departureTime;
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
        this.updateStationDetails(timeDiffsArr, stationDetails);
    }

    componentDidUpdate(prevProps){
        if(this.props.stationDetails.length !== prevProps.stationDetails.length){
            this.calculateIntervals(this.props.timeDates, this.props.stationDetails);
        }
    }

    render(){
        const detailRows = this.state.stationDetailsWTime.map(row => <DetailsRow detail={row} />);
        return(
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

        );
    }
}

export default DetailsTable