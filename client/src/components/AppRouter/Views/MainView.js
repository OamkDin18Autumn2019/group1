import React, { Component } from 'react'
import { Link } from "react-router-dom";
import DetailsView from './DetailsView.js'

// import train search component
import TrainSearch from '../../TrainSearch/TrainSearch'

class MainView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <div>
                <h2>Select a Train</h2>
                <Link to="/login"><button>Login</button></Link>  
                <Link to="/register"><button>Register</button></Link>  
                <TrainSearch data={this.state.data} />
                <h2>Train Details</h2>
                <DetailsView />
            </div>
        )
    }
}

export default MainView