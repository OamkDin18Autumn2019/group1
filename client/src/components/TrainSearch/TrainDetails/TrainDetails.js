import React, {Component} from 'react';

import DetailsTable from './DetailsTable/DetailsTable'

class TrainDetails extends Component{

    constructor(){
        super();
        this.state = { 
            stationDetails: [],
            details: [],
            stationCodes: [],
            stationNames: [],
         };        
    }
    

    
    setFinalDetails(){
    
        let randomServerResArr = [];
        for (var i=0; i<this.state.stationNames.length; i++) {
            let serverResObj = new Object();
            serverResObj.letter = this.state.stationNames[i][1].stationId.slice(0,1);
            serverResObj.list = this.state.stationNames[i];
            randomServerResArr.push(serverResObj);
        }
        
        let arrangedServerResArr = []; 
        for (var i=0; i<this.state.stationCodes.length; i++){
            let arr = [];
            for (var j=0; j<randomServerResArr.length; j++){
                if(randomServerResArr[j].letter === this.state.stationCodes[i].slice(0,1)){
                    arr.push(randomServerResArr[j]);
                }
            }
            arrangedServerResArr.push(arr[0]);
        }


        
        let stationNamesDict = [];
        for (var i=0; i<this.state.stationCodes.length; i++) {
            if (this.state.stationCodes[i].slice(0,1) === arrangedServerResArr[i].letter) {
                stationNamesDict.push(arrangedServerResArr[i].list);
            }
        }

        let stationNamesArr = [];
        for (var i=0; i<stationNamesDict.length; i++) {
            if(stationNamesArr.length !== i){
                stationNamesArr.push("couldn't resolve the station");
            }
            for (var j=0; j<stationNamesDict[i].length; j++) {
                if (stationNamesDict[i][j].stationId === this.state.stationCodes[i]) {
                    stationNamesArr.push(stationNamesDict[i][j].stationName);
                }
            }
        }

        

        
        let stationDetailsArr = [];
        if (this.state.details.length === stationNamesArr.length) {
            for (var i=0; i<this.state.details.length; i++) {
                
                let stationDetailsObj = new Object();
                
                stationDetailsObj.stationName = stationNamesArr[i];
                stationDetailsObj.arrivalTime = this.state.details[i].arrivalTime;
                stationDetailsObj.departureTime = this.state.details[i].departureTime;
                stationDetailsObj.trackNum = this.state.details[i].trackNum;
                
                stationDetailsArr.push(stationDetailsObj);
            }
        } 

        let stationDetailsArrNeg = [];
        if (this.state.details.length !== stationNamesArr.length) {
            let stationDetailsObj = new Object();
                
                stationDetailsObj.stationName = this.state.details[i].stationId;
                stationDetailsObj.arrivalTime = this.state.details[i].arrivalTime;
                stationDetailsObj.departureTime = this.state.details[i].departureTime;
                stationDetailsObj.trackNum = this.state.details[i].trackNum;
                
                stationDetailsArrNeg.push(stationDetailsObj);            
        }
        
        if (stationDetailsArr.length !== 0) {
            this.setState({ stationDetails: stationDetailsArr });
        }

        if (stationDetailsArrNeg.length !== 0) {
            this.setState({ stationDetails: stationDetailsArrNeg });
        }
    }

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
                <DetailsTable stationDetails={this.state.stationDetails} />
            </div>
        );
    }
}

export default TrainDetails