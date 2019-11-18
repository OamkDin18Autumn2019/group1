import React, { Component } from 'react'
import { Link } from "react-router-dom";


function register(event) {
  event.preventDefault();
  
}


class RegisterView extends Component {

  render() {
        return (
            <div>
                <h2> User register</h2>
      <div>Please enter your full name, username and password</div>
      <br/>
      <form onSubmit={ register }>
        <div className="tableCellNoBorder">
          <div className="tableRow">
            <div className="tableCellNoBorder"> Full name: </div>
            <div className="tableCellNoBorder"> <input type="text" name="full_name" /> </div>
          </div>
          <div className="tableRow">
            <div className="tableCellNoBorder"> Username: </div>
            <div className="tableCellNoBorder"> <input type="text" name="username" /> </div>
          </div>
          <div className="tableRow">
            <div className="tableCellNoBorder"> Password: </div>
            <div className="tableCellNoBorder"> <input type="password" name="password" /> </div>
          </div>
          <div className="tableRow">
            <div className="tableCellNoBorder"> <br/>  <button type="submit">Register</button> </div>
            <div className="tableCellNoBorder"> <br/>  <Link to="/"><button>Cancel</button></Link> </div>
          </div>
        </div>
      </form>
                
            </div>
        )
    }
}

export default RegisterView