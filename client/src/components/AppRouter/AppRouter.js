import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// import views
import MainView from './Views/MainView'
import LoginView from './Views/LoginView'
import RegisterView from './Views/RegisterView'

class AppRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            locationData: this.props.locationData,
            userFullName: null
        }
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={props => <MainView {...props} data={this.state.data} locationData={this.state.locationData} />} />
                <Route path='/login' component={ LoginView } />
                <Route path='/register' component={ RegisterView } />
            </div>
        )
    }
}

export default AppRouter