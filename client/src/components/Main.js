import React, { Component } from 'react'

// import approuter
import AppRouter from './AppRouter/AppRouter'
import Nav from './Nav/Nav'

class Main extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            isLoading: true,
            userFullName: null,
            fullUser: null,
        }
        this.setUserFullName = this.setUserFullName.bind(this);
        this.setFullUser = this.setFullUser.bind(this);
    }

    // fetch all live trains
    componentDidMount() {
        // fetch trains and stations
        fetch('https://rata.digitraffic.fi/api/v1/trains')
            .then(res => res.json())
            .then(data => {
                this.setState({ data: data, isLoading: false })
            })
    }

    // Sets user fullname
    setUserFullName = (newValue) => {
        this.setState({ userFullName: newValue });
    }

    setFullUser(val){
        this.setState({ fullUser: val });
    }

    render() {
        if (this.state.isLoading) {
            return "Loading..."
        }

        return (
            <div>
                <Nav userFullName={this.state.userFullName} setUserFullName={this.setUserFullName} fullUserVal={this.state.fullUser} setFullUserVal={this.setFullUser} />
                <h1 className='title'>Train Tracker</h1>
                <AppRouter 
                    data={this.state.data} setUserFullName={this.setUserFullName} setFullUser={this.setFullUser} userInfo={this.state.fullUser}
                />
            </div>
            
        )
    }
}

export default Main