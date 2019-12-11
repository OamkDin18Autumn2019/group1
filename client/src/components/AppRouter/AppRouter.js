import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// import views
import MainView from './Views/MainView'
import LoginView from './Views/LoginView'
import RegisterView from './Views/RegisterView'
import History from './Views/History'

class AppRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }


    render() {
        return (
            <div>
                <Route exact path='/' render={props => <MainView {...props} data={this.state.data} />} />
                <Route exact path="/register" render={ props => <RegisterView  {...props} /> }/>
                <Route exact path="/login"    render={ props => <LoginView     {...props} setUserFullName={this.props.setUserFullName} /> }/>
                <Route exact path="/history"  render={ props => <History  {...props} /> }/>
            </div>
        )
    }
}

export default AppRouter