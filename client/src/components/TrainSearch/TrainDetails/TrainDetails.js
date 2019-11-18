import React, {Component} from 'react';

// import details table
import DetailsTable from './DetailsTable/DetailsTable'

class TrainDetails extends Component{

    constructor(){
        super();
        this.state = { 
            details: [],
         };        
    }

    loadData(val){
        let details = [];
        let detailsObj = undefined;
        let stations = [];
        let trainNum = val;
        fetch(`https://rata.digitraffic.fi/api/v1/trains/latest/${trainNum}`)
        .then(response => response.json())
        .then(data => {
                stations = data[0].timeTableRows;
                for (var i=0; i<stations.length; i++) {
                    detailsObj = {
                        stationId: stations[i].stationShortCode,
                        arrivalTime: stations[i].type,
                        departureTime: stations[i].scheduledTime,
                        trackNum: stations[i].commercialTrack,
                    };
                    details.push(detailsObj);
                }
                this.setState({ details: details });
            }    
        );
    }
    
    componentDidMount(){
        console.log(this.props.trainNum);
    }

    componentDidUpdate(prevProps){
        if(this.props.trainNum !== prevProps.trainNum){
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