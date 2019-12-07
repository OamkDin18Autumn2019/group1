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
        <h2 className='titleLogin'>User login</h2><br/>
        <div style={{textAlign: "center"}}>To login, enter your username and password</div>
        <br/>
        <form onSubmit={ this.userLogin }>
            <div className="tableNoBorder">

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
                    <div className="tableCellNoBorder"> <br/>  <button className='extraFunctionButton' type="submit"><span>Login</span></button> </div>
                    <div className="tableCellNoBorder"> <br/>  <Link to="/"><button className='extraFunctionButton'><span>Cancel</span></button></Link> </div>
                </div>
            </div>
        </form>
        </div>
    )
  }


}

export default LoginView
