import axios from 'axios';
import constants from '../../../constants.json';


let userInfo = {
  username: null,
  password: null
}


let myAuth = {
  authenticate: (username, password) => {      
    return new Promise((resolve, reject) => {
      axios.get(constants.apiAddress + '/api/users/login', 
      {
        auth: {
          username: username,
          password: password
        }
      }).then(result => {
        userInfo = {
          username: username,
          password: password
        }
        resolve(result.data.full_name);
      }).catch(error => {
        console.log('[ERROR] Auth.js authenticate() ' + error);
        reject();
      })
    });
  },


  getAxiosAuth: () => {
    return {
      auth: userInfo
    }
  } 
}

export default myAuth;
