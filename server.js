const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const dotenv = require("dotenv");
require('dotenv').config();

require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify token and assign user object of payload to req.user.
app.use(require('./config/checkToken'));

//api routes will go here
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/users', require('./routes/api/users'))
app.use('/api/messages', ensureLoggedIn, require('./routes/api/messages'))
app.use('/api/conversations', ensureLoggedIn, require('./routes/api/conversations'))


// The following "catch all" route (note the *) is necessary
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
const port = process.env.PORT || 3001;
app.listen(port, function () {
	console.log(`Express app running on port ${port}`);
});

/** -- Socket.io Server Config -- */

// setup the port our backend app will run on
const PORT = 3030;
const NEW_MESSAGE_EVENT = "new-message-event";

// const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: true,
  origins:["localhost:3000"]
});

app.use(cors());

// Hardcoding a room name here.
const room = "general"

io.on("connection", (socket) => {
    console.log('connected to socket.io')
  socket.join(room);

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    io.in(room).emit(NEW_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    socket.leave(room);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});


/** -- The code below is meant for password reset --*/

// const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
// const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// app.listen(3000, function () {
//     console.log('Node started on port 3000!')
// });

//This function accepts our payload and the secret key. The result of this function is our URL-friendly token, which contains our encoded header, payload and signature. 
var payload = { userId: 1 };
var secret = 'fe1a1915a379f3be5394b64d14794932';
var token = jwt.encode(payload, secret);

console.log(token);

var decode = jwt.decode(token, secret);

console.log(decode);

//With our web server set up, the next set of code will display a form that asks the user for their email address. This will begin the password-reset process:
app.get('/forgotpassword', function (req, res) {
    res.send('<form action="/passwordreset" method="POST">' +
                '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
                '<input type="submit" value="Reset Password" />' +
             '</form>'
    );
});


//sends http POST request with generated token to user found by email. The controller res.sends email
app.post('/passwordreset', function (req, res) {
    if (req.body.email !== undefined) {
        var emailAddress = req.body.email;

        // TODO: Using email, find user from your database.
        var payload = {
            id: 1,        // User ID from database
            email: emailAddress
        };

        // TODO: Make this a one-time-use token by using the user's
        // current password hash from the database, and combine it
        // with the user's created date to make a very unique secret key!
        // For example:
        // var secret = user.password + ‘-' + user.created.getTime();
        var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';

        var token = jwt.encode(payload, secret);

        // TODO: Send email containing link to reset password.
        // In our case, will just return a link to click.
        res.send('<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>');
    } else {
        res.send('Email address is missing.');
    }
});


//Upon successful decoding and validation of the token, a form is displayed allowing the user to set their new password
app.get('/resetpassword/:id/:token', function(req, res) {
    // TODO: Fetch user from database using
    // req.params.id
    // TODO: Decrypt one-time-use token using the user's
    // current password hash from the database and combine it
    // with the user's created date to make a very unique secret key!
    // For example,
    // var secret = user.password + ‘-' + user.created.getTime();
    var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';
    var payload = jwt.decode(req.params.token, secret);

    // TODO: Gracefully handle decoding issues.
    // Create form to reset password.
    res.send('<form action="/resetpassword" method="POST">' +
        '<input type="hidden" name="id" value="' + payload.id + '" />' +
        '<input type="hidden" name="token" value="' + req.params.token + '" />' +
        '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
        '<input type="submit" value="Reset Password" />' +
    '</form>');
});


//The final part now is to handle the form’s POST with the user’s new password:

app.post('/resetpassword', function(req, res) {
    // TODO: Fetch user from database using
    // req.body.id
    // TODO: Decrypt one-time-use token using the user's
    // current password hash from the database and combining it
    // with the user's created date to make a very unique secret key!
    // For example,
    // var secret = user.password + ‘-' + user.created.getTime();
    var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';

    var payload = jwt.decode(req.body.token, secret);

    // TODO: Gracefully handle decoding issues.
    // TODO: Hash password from
    // req.body.password
    res.send('Your password has been successfully changed.');
});
