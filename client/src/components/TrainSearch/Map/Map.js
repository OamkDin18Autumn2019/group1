import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                initialCenter={{ lat: 64.00, lng: 26.50 }}
            >
                <Marker />
            </ Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer)