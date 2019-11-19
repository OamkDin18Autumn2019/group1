import React from 'react'
import { Link } from 'react-router-dom'

function NavLink(props) {
    return (
        <Link to={props.route} ><button className="mainFunctionButton">{props.button}</button></Link>
    )
}

export default NavLink