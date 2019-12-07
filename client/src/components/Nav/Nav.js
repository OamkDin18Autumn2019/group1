import React, { Component } from 'react'

// import navlink
import NavLink from './NavLink/NavLink'
import { Link } from "react-router-dom";

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routes: ["Home", "Login", "Register"]
        }
    }

    routeMap = () => {
        return this.state.routes.map((route, index) => {
            return <NavLink 
                key={index}
                button={route}
                route={ route === "Home" ? "/" : route.toLowerCase() }
            />
        })
    }

    logout = (event) => {
        event.preventDefault();
        this.props.setUserFullName(null);
    }

    render() {
        return (
            <div>
                { /* If user has not login (userFullName is null) then show visitor text and instuctions, otherwise show user fullname */
                    this.props.userFullName == null ? (
                        <div className='titleGreeting'>Hello visitor! You must login, if you do not have account, please register at first.</div>
                    ) : (
                        <div>Hello { this.props.userFullName }!</div>
                    )
                }

                {/*this.routeMap()*/}

                { /* If user has not login (userFullName is null) then show Home, Login and Register buttons, otherwise show Home and Logout buttons */
                    this.props.userFullName == null ? (
                        <div>
                            <Link to="/"><button className='mainFunctionButton'>Home</button></Link>
                            <Link to="/login"><button className='mainFunctionButton'>Login</button></Link>
                            <Link to="/register"><button className='mainFunctionButton'>Register</button></Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/"><button>Home</button></Link>
                             <button onClick={this.logout}>Logout</button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Nav