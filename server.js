'use strict';
// importing dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
//creating instances
var app = express();
var router = express.Router();


//setting up port to 3001
var port = process.env.API_PORT || 3001;


mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds043972.mlab.com:43972/reactapp');
// configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
// remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});
//adding the /comments route to our /api router
router.route('/comments')
 //retrieve all comments from the database
  .get(function(req, res) {
   //looks at our Comment Schema
     Comment.find(function(err, comments) {
       if (err) {
         res.send(err);
       } else {
         res.json(comments)
       }
   //responds with a json object of our database comments.
      });
 })
 //post new comment to the database
//  .post(function(req, res) {
//  var comment = new Comment();
//  //body parser lets us use the req.body
//  comment.author = req.body.author;
//  comment.text = req.body.text;
// comment.save(function(err) {
//  if (err)
//  res.send(err);
//  res.json({ message: 'Comment successfully added!' });
//  });
//  });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
