import React, { Component } from 'react'
import { Link } from "react-router-dom";


function login(event) {    
    event.preventDefault();
} 


class LoginView extends Component {
    render() {
        return (
            <div>
              <h2>User login</h2>
              <div>Please enter your username and password</div>
              <br/>
              <form onSubmit={ login }>
                <div className="tableCellNoBorder">
                  <div className="tableRow">
                    <div className="tableCellNoBorder"> Username: </div>
                    <div className="tableCellNoBorder"> <input type="text" name="username" /> </div>
                  </div>
                  <div className="tableRow">
                    <div className="tableCellNoBorder"> Password: </div>
                    <div className="tableCellNoBorder"> <input type="password" name="password" /> </div>
                  </div>
                  <div className="tableRow">
                    <div className="tableCellNoBorder"> <br/>  <button type="submit">Login</button> </div>
                    <div className="tableCellNoBorder"> <br/>  <Link to="/"><button>Cancel</button></Link> </div>
                  </div>
                </div>
              </form>
            </div>
          )
    }
}

export default LoginView