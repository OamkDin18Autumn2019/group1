import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


  /* Used for registering user */
  function userRegister(event) {
    event.preventDefault();
    axios.post('http://localhost:4000' + '/users/register', {
      full_name: event.target['full_name'].value,
      username:  event.target['username'].value,
      password:  event.target['password'].value
    }).catch(function (error) {
      /* Something went wrong, show error popup */
      //alert("Registering failed, db error?");
      console.log(error);
    });
    //props.history.push('/');
  }



class RegisterView extends Component {

  render() {
        return (
            <div>
                <h2> User register</h2>
      <div>Please enter your full name, username and password</div>
      <br/>
      <form onSubmit={ userRegister }>
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