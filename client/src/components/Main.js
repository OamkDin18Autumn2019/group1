import React, { Component } from 'react'

import TrainSearch from './TrainSearch/TrainSearch'

class Main extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            isLoading: true
        }
    }

    // fetch all live trains
    componentDidMount() {
        fetch('https://rata.digitraffic.fi/api/v1/live-trains')
            .then(res => res.json())
            .then(data => {
                this.setState({ data: data, isLoading:false })
                console.log(this.state.data)
            })
    }

    render() {
        if (this.state.isLoading) {
            return "Loading..."
        }

        return (
            <div>
                <TrainSearch />
            </div>
        )
    }
}

export default Main