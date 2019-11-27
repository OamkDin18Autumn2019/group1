const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./mdb');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

const saltRounds = 4;

app.use(bodyParser.json());
app.use(cors())


/* Used for checking user authentication */
passport.use(new Strategy((username, password, cb) => {
  db.query('users', { username: username}).then(dbResults => {
    if(dbResults == null || dbResults.length == 0) {
      return cb(null, false);
    }

    bcrypt.compare(password, dbResults.password).then(bcryptResult => {
      if(bcryptResult == true) {
        cb(null, { id: dbResults._id, username: dbResults.username, full_name: dbResults.full_name });
      } else {
        return cb(null, false);
      }
    })


  })
}));


/* Checks user login and authentication,
   needs following arguments: username,
   if authetication is succesful returs users full name in full_name */
app.get('/users/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
  //Send back user full name        
  res.json( { full_name: req.user.full_name } );
});


/* Register a new user,
   needs following arguments: full_name, username, password
*/
app.post('/users/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds).then(hash =>
      db.insert('users', { full_name: req.body.full_name, username: req.body.username, password: hash })
    )
    .then(dbResults => {
        res.sendStatus(201);
    })
    .catch(error => res.sendStatus(500));
});


/* DB init */
Promise.all(
  [
      // Add database creation if needed...
  ]
).then(() => {
  app.listen(port, () => {
      console.log(`Register/Login API listening on http://localhost:${port}\n`);
  });
})
.catch(error => console.log(error));
