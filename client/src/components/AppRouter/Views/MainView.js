import React, { Component } from 'react'

// import train search component
import TrainSearch from '../../TrainSearch/TrainSearch'

class MainView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            locationData: this.props.locationData
        }
    }

    render() {
        return (
            <div>
                <TrainSearch 
                    data={this.state.data} 
                    locationData={this.state.locationData} 
                />
            </div>
        )
    }
}

export default MainView