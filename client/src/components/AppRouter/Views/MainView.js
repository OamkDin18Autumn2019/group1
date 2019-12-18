import React, { Component } from 'react'

// import train search component
import TrainSearch from '../../TrainSearch/TrainSearch'

class MainView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            fullUser: this.props.userInfo
        }
    }

    render() {
        return (
            <div>
                <TrainSearch 
                    data={this.state.data}
                    userInfo={this.state.fullUser}
                />
            </div>
        )
    }
}

export default MainView