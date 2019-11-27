import React, {Component} from 'react';

import DetailsTable from './DetailsTable/DetailsTable'

class TrainDetails extends Component{

    constructor(){
        super();
        this.state = { 
            details: [],
            stationCodes: [],
            stationNames: [],
         };        
    }
    
    
    setFinalDetails(){
        console.log('the response from server');
        console.log(this.state.stationNames);
        console.log('the response from endpoint');
        console.log(this.state.details);
        //console.log(this.state.stationCodes.length);

        for (var i=0; i<this.state.stationNames.length; i++) {
            console.log("new one starts from here");
            for (var j=0; j<this.state.stationNames[i].length; j++) {
                //console.log(this.state.stationNames[i][j]);
                } 

            }
        }


        /*
        for (var i=0; i<this.state.details.length; i++){
            if(this.state.details[i].stationId === this.state.stationNames[i].stationId) {
                this.state.details[i].stationName = this.state.stationNames[i].stationName;
            }
        }
        console.log(this.state.details);
        */

    resolveStation(){
        let dataArr = [];
        for (var i=0; i<this.state.stationCodes.length; i++) {
            let name = 'E';
            let firstLetter = this.state.stationCodes[i].slice(0,1);
            let stationReq = new Object();
            stationReq.letter = firstLetter;
            fetch('http://localhost:4000/api/resolve_station', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(stationReq),
            })
            .then(response => response.json())
            .then(data => {
                dataArr.push(data);
               if(dataArr.length === this.state.stationCodes.length){
                    this.setState({ stationNames: dataArr });
                    this.setFinalDetails();
               }   
            });
        }
    }

    loadData(val){
        let details = [];
        let detailsObj = undefined;
        let stations = undefined;
        let stationCodes = [];
        let trainNum = val;
        //let stationNames = [];
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
/*
                for (var i=0; i<arrivalArr.length; i++){
                    let stationCode = arrivalArr[i].stationShortCode;
                    let firstLetter = arrivalArr[i].stationShortCode.slice(0,1);
                    let resolveStation = new Object();
                    
                    resolveStation.letter = firstLetter;
                    fetch('http://localhost:4000/api/resolve_station', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body:JSON.stringify(resolveStation),
                    })
                    .then(response => response.json())
                    .then(data => {
                        for (var j=0; j<data.length; j++){
                            if (stationCode === data[j].stationId) {
                                this.state.stationNames.push(data[j].stationName);
                            }
                        }
                    });
                }
                console.log(this.state.stationNames.length);
*/
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
                this.resolveStation();                
                //console.log(this.state.stationCodes);
            }    
        );
    }


    
    componentDidMount(){
    }

    componentDidUpdate(prevProps){
        if(this.props.trainNum !== prevProps.trainNum){
            //this.loadStations(this.props.trainNum);
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

export default TrainDetails