import React, { Component } from 'react'
import { Link } from "react-router-dom";


function login(event) {    
    event.preventDefault();
} 


class LoginView extends Component {
    render() {
        return (
            <div>
              <h2 className="titleLogin">User login</h2><br/>
              <div style={{textAlign: "center"}}>Please enter your username and password</div>
              <br/>
              <form onSubmit={ login }>
                <div className="tableCellNoBorder">

                <div className="tableRow">
                    <input type="text" name="username" required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Username...</label>
                </div>

                <div className="tableRow">
                    <input type="password" name="password" required/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Password...</label>
                </div>

                <div className="tableRow">
                    <div className="tableCellNoBorder"> <br/>  <button className="extraFunctionButton" type="submit"><span>Login</span></button> </div>
                    <div className="tableCellNoBorder"> <br/>  <Link to="/"><button className="extraFunctionButton"><span>Cancel</span></button></Link> </div>
                </div>
                </div>
              </form>
            </div>
          )
    }
}

export default LoginView