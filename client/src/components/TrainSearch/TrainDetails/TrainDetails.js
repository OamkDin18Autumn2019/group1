import React, {Component} from 'react';

import DetailsTable from './DetailsTable/DetailsTable'

class TrainDetails extends Component{

    constructor(){
        super();
        this.state = { 
            stationDetails: [],
            details: [],
            timeDetails: [],
            timeDates: [],
            stationCodes: [],
            stationNames: [],
         };        
    }
    
    setFinalDetails(){
        let stationDetailsArr = [];
        for (var i=0; i<this.state.details.length; i++) {
            
            let stationDetailsObj = new Object();
            
            stationDetailsObj.stationName = this.state.stationNames[i];
            stationDetailsObj.arrivalTime = this.state.timeDetails[i].arrivalTime;
            stationDetailsObj.departureTime = this.state.timeDetails[i].departureTime;
            stationDetailsObj.trackNum = this.state.details[i].trackNum;
            
            stationDetailsArr.push(stationDetailsObj);
        }
        console.log('data passed on to the DetailsTable component...');  
        this.setState({ stationDetails: stationDetailsArr });
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
        console.log('time values processed and formatted...')
        this.setFinalDetails();
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


    
    componentDidMount(){
    }

    componentDidUpdate(prevProps){
        if(this.props.trainNum !== prevProps.trainNum){
            this.loadData(this.props.trainNum);
        }
    }

    render(){
        return(
            <div>
                <DetailsTable stationDetails={this.state.stationDetails} timeDates={this.state.timeDates} />
            </div>
        );
    }
}

export default TrainDetails