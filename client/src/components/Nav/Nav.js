import React, { Component } from 'react'

// import navlink
import NavLink from './NavLink/NavLink'

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

    render() {
        return (
            <div>
                {this.routeMap()}
            </div>
        )
    }
}

export default Nav