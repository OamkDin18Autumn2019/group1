import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import constants from '../../../constants.json';


class RegisterView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      toRoot: false,
    }
  }


  // Used for registering new user
  userRegister = (event) => {
    event.preventDefault();
    axios.post(constants.apiAddress + '/api/users/register', {
      full_name: event.target['full_name'].value,
      username:  event.target['username'].value,
      password:  event.target['password'].value
    }).then(response => {
      // Axios operation ok, set toRoot to redirect user back to root
      this.setState({ toRoot: true });
      alert('User registration succesful.\n\nNow press Login-button and\nuse your username and password\nto login into system.');
    }).catch(function(error) {
      // Something went wrong, check response data and show error popup
      console.log('[INFO] RegisterView.js userRegister() status=' + error.response.status + ' data=' + error.response.data);
      if(error.response.data === 'Username already exists') {
        alert('User registration failed.\n\nUsername already exists.\nPlease choose different username.');
      } else {
        alert("User registration failed.\n\nUnknown error.");
      }
    });
  }


  render() {
    // Check if we need to go back to root after succesful registration
    if (this.state.toRoot === true) {
      return <Redirect to='/' />
    }

    // Otherwise show registration form
    return (
      <div>
        <h2> User registration </h2>
        <div>To register, please enter your full name, username and password</div>
        <br/>
        <form onSubmit={ this.userRegister }>
          <div className="tableNoBorder">
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
