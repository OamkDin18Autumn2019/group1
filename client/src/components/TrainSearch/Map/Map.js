import React, { Component } from 'react'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

// get google api key
let API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationData: [],
            data: this.props.data,
            isLoading: true,
            trainNumber: this.props.trainNumber,
            showingInfoWindow: false,
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

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    onMapClick = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
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
                initialCenter={{ 
                    lat: 64.00, 
                    lng: 26.50 
                }}
                onClick={this.onMapClick}
            >
                <Marker 
                    position={{ 
                        lat: this.state.locationData[0].location.coordinates[1], 
                        lng: this.state.locationData[0].location.coordinates[0] 
                    }}
                    onClick={this.onMarkerClick}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>Train {this.state.trainNumber}</h1>
                    </div>
                </InfoWindow>
            </ Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)