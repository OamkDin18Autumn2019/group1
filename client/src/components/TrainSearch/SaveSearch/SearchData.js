import React, {Component} from 'react';

class SearchData extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstStation: '',
            lastStation: '',
            travelTime: ''
        };
    }
        /*
        this.props.getSearchData(this.state.firstStation, this.state.lastStation, this.state.travelTime);
        */

    componentDidUpdate(prevProps){
        if(this.props.travelTime !== prevProps.travelTime){
            console.log(this.props.firstStation);
            console.log(this.props.lastStation);
            console.log(this.props.travelTime);
            this.setState({firstStation: this.props.firstStation});
            this.setState({lastStation: this.props.lastStation});
            this.setState({travelTime: this.props.travelTime});
        }
        /*
        console.log(this.state.firstStation);
        console.log(this.state.lastStation);
        console.log(this.state.travelTime);
        */
    }

    render(){
        return(
            <div></div>
        );
    }
}

export default SearchData;