import React, {Component} from 'react';

import DetailsTable from './DetailsTable/DetailsTable'
import StationSearch from './StationSearch/StationSearch'

class TrainDetails extends Component{

    constructor(){
        super();
        this.state = {
            selectedStations: [],
            stationDetails: [],
            details: [],
            timeDetails: [],
            timeDates: [],
            stationCodes: [],
            stationNames: [],
            query: "",
            filteredStationDetails: []
         };
        this.getSelection = this.getSelection.bind(this);
    }

    getSelection(arr){
        this.setState({selectedStations: arr});
        console.log(arr);
    }

    setFinalDetails(timeArr){
        let timeDates = this.state.timeDates;
        let stationDetailsArr = [];
        const { query } = this.state
        for (var i=0; i<this.state.details.length; i++) {
            
            let stationDetailsObj = new Object();

            let timeStr = undefined;
            if(timeArr[i].hours === undefined){
                timeStr = '---';
            }else{
                timeStr = `${timeArr[i].hours} : ${timeArr[i].minutes}`;
            }
            
            stationDetailsObj.stationName = this.state.stationNames[i];
            stationDetailsObj.arrivalTime = this.state.timeDetails[i].arrivalTime;
            stationDetailsObj.departureTime = this.state.timeDetails[i].departureTime;
            stationDetailsObj.trackNum = this.state.details[i].trackNum;
            stationDetailsObj.stayTimeSec = timeArr[i].seconds;
            stationDetailsObj.stayTimeHM = timeStr;
            stationDetailsObj.arrivalTimeDateObj = timeDates[i].arrivalTime;
            stationDetailsObj.departureTimeDateObj = timeDates[i].departureTime;
            stationDetailsObj.id = i;
            stationDetailsObj.checked = false;
            
            stationDetailsArr.push(stationDetailsObj);
        }

        const filteredStationDetails = stationDetailsArr.filter(element => {
            return element.stationName.toLowerCase().includes(query.toLowerCase())
        })

        this.setState({ stationDetails: stationDetailsArr, filteredStationDetails });
        console.log('data passed on to the DetailsTable component...');  
    }
    
    calculateIntervals(){
        console.log("data processing started in DetailsTable component");
        let timeDates = this.state.timeDates;
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
        this.setFinalDetails(timeDiffsArr);
    }

    processTime(){
        let timesArr = [];
        let timeDatesArr = [];
        for(var i=0; i<this.state.details.length; i++){
            let timesArrObj = new Object();
            let timeDatesArrObj = new Object();
            if(this.state.details[i].arrivalTime === "---"){
                timesArrObj.arrivalTime = this.state.details[i].arrivalTime;
                timeDatesArrObj.arrivalTime = this.state.details[i].arrivalTime;
            }
            if (this.state.details[i].arrivalTime !== "---"){
                let formattedTime = "";
                let dateObj = new Date(this.state.details[i].arrivalTime);
                timeDatesArrObj.arrivalTime = dateObj;
                formattedTime = `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}  **  ${dateObj.getHours()}:${dateObj.getMinutes()}`;
                timesArrObj.arrivalTime = formattedTime;
            }
            if(this.state.details[i].departureTime === "---"){
                timesArrObj.departureTime = this.state.details[i].departureTime;
                timeDatesArrObj.departureTime = this.state.details[i].departureTime;
            }
            if (this.state.details[i].departureTime !== "---"){
                let formattedTime = "";
                let dateObj = new Date(this.state.details[i].departureTime);
                timeDatesArrObj.departureTime = dateObj;
                formattedTime = `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}  **  ${dateObj.getHours()}:${dateObj.getMinutes()}`;
                timesArrObj.departureTime = formattedTime;
            }
            timesArr.push(timesArrObj);
            timeDatesArr.push(timeDatesArrObj);
        }
        this.setState({ timeDetails: timesArr });
        this.setState({ timeDates: timeDatesArr });
        this.calculateIntervals();
        console.log('time values processed and formatted...');
    }

    resolveStation(){
        let stationNames = [];

        for (var i=0; i<this.state.stationCodes.length; i++) {   
            let code = this.state.stationCodes[i];
            fetch('http://localhost:4000/api/stations_raw_data')
            .then(response => response.json())
            .then(data => {
                for (var j=0; j<data.data.length; j++) {
                    if (data.data[j].stationShortCode === code){
                        stationNames.push(data.data[j].stationName);
                    }
                }
                if (this.state.stationCodes.length === stationNames.length){   
                    this.setState({ stationNames: stationNames });
                    console.log('stations names resolved with data from local database...')
                    this.processTime();      
                }    
            });
        }
    }
 
    loadData(val){
        console.log('Starting data processing in TrainDetails component.')
        let details = [];
        let detailsObj = undefined;
        let stations = undefined;
        let stationCodes = [];
        let trainNum = val;
        fetch(`https://rata.digitraffic.fi/api/v1/trains/latest/${trainNum}`)
        .then(response => response.json())
        .then(data => {
                stations = data[0].timeTableRows;
                let arrivalArr = [];
                let departureArr = [];
                let departureFirst = undefined;
                let arrivalLast = undefined;

                for (var i=0; i<stations.length; i++){
                    if (stations[i].type === 'DEPARTURE') {
                        departureArr.push(stations[i]);
                    }
                }
                departureFirst = departureArr.shift();

                for (var i=0; i<stations.length; i++) {
                    if (stations[i].type === 'ARRIVAL') {
                        arrivalArr.push(stations[i]);
                    }
                }
                arrivalLast = arrivalArr.pop();

                details.push({
                    stationId: departureFirst.stationShortCode,
                    arrivalTime: "---",
                    departureTime:departureFirst.scheduledTime,
                    trackNum: departureFirst.commericialTrack,
                });
                stationCodes.push(departureFirst.stationShortCode);

                for (var i=0; i<arrivalArr.length; i++) {
                    if(arrivalArr[i].stationShortCode === departureArr[i].stationShortCode){
                        detailsObj = {
                            stationId: arrivalArr[i].stationShortCode,
                            arrivalTime: arrivalArr[i].scheduledTime,
                            departureTime: departureArr[i].scheduledTime,
                            trackNum: arrivalArr[i].commercialTrack,
                        };
                    }
                    details.push(detailsObj);
                    stationCodes.push(arrivalArr[i].stationShortCode);
                }
                details.push({
                    stationId: arrivalLast.stationShortCode,
                    arrivalTime: arrivalLast.scheduledTime,
                    departureTime:"---",
                    trackNum: arrivalLast.commericialTrack,
                });
                stationCodes.push(arrivalLast.stationShortCode);
                this.setState({ stationCodes: stationCodes });
                this.setState({ details: details });
                console.log('data received from remote server...')
                this.resolveStation();                
            }    
        );
    }

    handleInputChange = (e) => {
        const query = e.target.value

        this.setState(prevState => {
            const filteredStationDetails = prevState.stationDetails.filter(element => {
                return element.stationName.toLowerCase().includes(query.toLowerCase())
            })

            return {
                query,
                filteredStationDetails
            }
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.trainNum !== prevProps.trainNum){
            this.loadData(this.props.trainNum);
        }
        //console.log(this.state.filteredStationDetails)
    }

    render(){
        return(
            <div>
                <StationSearch handleInputChange={this.handleInputChange} value={this.state.query} />
                <DetailsTable stationDetails={this.state.filteredStationDetails} getSelectedStations={this.getSelection} />
            </div>
        );
    }
}

export default TrainDetails