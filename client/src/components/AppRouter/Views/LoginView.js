import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import Auth from './Auth';


class LoginView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      toRoot: false,
    }
  }


  // Used for registering new user
  userLogin = (event) => {
    event.preventDefault();
    Auth.authenticate(event.target['username'].value, event.target['password'].value).then(result => {
      // If login is succesfull, result contains user full name which is saved through setUserFullName function
      // then redirect back to app root
      this.props.setUserFullName(result);
      this.setState({ toRoot: true });
    }).catch((error) => {
      console.log(error);
      // User login failed show error popup
      alert("User login failed\n\nWrong password or username");
    })
  }


  render() {
    // Check if we need to go back to root after succesful login
    if(this.state.toRoot === true) {
      return <Redirect to='/' />
    }

    // Otherwise show login form
    return (
      <div>
        <h2>User login</h2>
        <div>To login, enter your username and password</div>
        <br/>
        <form onSubmit={ this.userLogin }>
          <div className="tableNoBorder">
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
