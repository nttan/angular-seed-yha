Installation
============
+ Clone the project into a \<project dir\>
+ Install [Node.js](http://nodejs.org/ "Node.js")
+ Install Grunt CLI
  + npm install -g grunt-cli
    + Command line interface for Grunt
+ Install Grunt
  + npm install grunt
    + Actual Grunt task runner
+ Install Grunt Contrib Copy
  + npm install grunt-contrib-copy
    + Task for copying files
+ Install Express
   + npm install express
+ Install Mongoose
   + node install mongoose
+ Install Karma
   + node install karma
+ Optional - Run app setup
   + grunt help
   + Example:  grunt --port=4242 --app-name=pixie --base-url=http://www.google.com
+ Start Node server \(inside project directory\)
   + If using MongoDB: node node-server.js
   + No DB:            node node-server-no-db.js
+ Browse to http://localhost:8080/app