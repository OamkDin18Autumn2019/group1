import React, { Component } from 'react'

// import train search component
import TrainSearch from '../../TrainSearch/TrainSearch'

class MainView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
        }
    }

    render() {
        return (
            <div>
                <TrainSearch 
                    data={this.state.data} userInfo={this.props.userInfo}
                />
            </div>
        )
    }
}

export default MainView