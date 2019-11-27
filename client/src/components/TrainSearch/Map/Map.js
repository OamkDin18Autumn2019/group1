import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationData: [],
            data: this.props.data,
            isLoading: true,
            showingInfoWindow: false,
            trainNumber: this.props.trainNumber,
            activeMarker: {},
            selectedPlace: {}
        }
    }

    componentDidMount() {
        // fetch train location data
        fetch('https://rata.digitraffic.fi/api/v1/train-locations/latest/' + this.state.trainNumber)
            .then(res => res.json())
            .then(locationData => {
                this.setState({ locationData: locationData, isLoading: false })
        })
    }

    render() {
        if (this.state.isLoading) {
            return "Loading..."
        }

        if (this.state.locationData[0] === undefined) {
            return "Couldn't find train..."
        }

        return (
            <Map
                google={this.props.google}
                zoom={6}
                initialCenter={{ lat: 64.00, lng: 26.50 }}
            >
                <Marker position={{ lat: this.state.locationData[0].location.coordinates[1], lng: this.state.locationData[0].location.coordinates[0] }} />
            </ Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer)