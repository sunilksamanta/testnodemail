// Require express and create an instance of it
var express = require('express');
var app = express();
const nodemailer = require('nodemailer');

// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

// On localhost:3000/welcome
app.get('/testMail', function (req, res) {

    // Create a SMTP transport object
    var transport = nodemailer.createTransport("SMTP", {
        auth: {
            user: "sunilthedj@gmail.com",
            pass: "jgsgcspmvjmmzgrr"
        }
    });

    console.log('SMTP Configured');

// Message object
    var message = {

        // sender info
        from: 'Sender Name <sender@example.com>',

        // Comma separated list of recipients
        to: '"Receiver Name" <sunilkumar.samanta@yahoo.com>',

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'
    };

    console.log('Sending Mail');
    transport.sendMail(message, function(error){
        if(error){
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');

        // if you don't want to use this transport object anymore, uncomment following line
        //transport.close(); // close the connection pool
    });
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});