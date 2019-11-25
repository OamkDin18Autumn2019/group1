import React, { Component } from 'react'

// import components
import Dropdown from './Dropdown/Dropdown'
import Button from './Button/Button'
import TrainDetails from './TrainDetails/TrainDetails'
import MapContainer from './Map/Map'

class TrainSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            select: this.props.data[0].trainNumber,
            data: this.props.data,
            locationData: this.props.locationData,
            buttonVal: undefined,
            showMap: false
        }
    }

    // select change handler
    handleSelectChange = (e) => {
        this.setState({ select: e.target.value })
    }

    // input search change handler
    handleSearchClick = () => {
        this.setState({ buttonVal: this.state.select, searchClicked: false });
    }

    // display map
    handleShowMapClick = () => {
        this.setState({ showMap: true })
    }

    //  stop displaying map
    handleMinimizeMapClick = () => {
        this.setState({ showMap: false })
    }

    render() {
        if (this.state.showMap) {
            return <MapContainer 
                data={this.state.data}

            />
        }

        return (
            <div>
                <h2>Select a Train</h2>
                <Dropdown 
                    data={this.state.data} 
                    value={this.state.select} 
                    onChange={this.handleSelectChange} 
                />
                <Button 
                    onClick={this.handleSearchClick} 
                    buttonText="Display train details"
                />
                <Button
                    onClick={this.handleShowMapClick}
                    buttonText="Display selected train on a map"
                />
                <h2>Train Details</h2>
                <TrainDetails 
                    trainNum={this.state.buttonVal} 
                />
            </div>
        )
    }
}

export default TrainSearch