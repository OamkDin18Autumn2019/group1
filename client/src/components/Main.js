import React, { Component } from 'react'
import './Styling.css'

// import approuter
import AppRouter from './AppRouter/AppRouter'


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
        fetch('https://rata.digitraffic.fi/api/v1/trains')
            .then(res => res.json())
            .then(data => {
                this.setState({ data: data, isLoading: false })
            })
    }

    render() {
        if (this.state.isLoading) {
            return "Loading..."
        }
        return (
            <div>
                <h1 className='title'>Train Tracker</h1>
                <AppRouter data={this.state.data} />
            </div>
            
        )
    }
}

export default Main