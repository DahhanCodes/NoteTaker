const path = require('path');
const express = require('express');
const DB = require("./Develop/db/db.json");
const fs = require("fs");
const routes = require("./Develop/controllers")


//creating an express app
const app = express();
    //creating a port to host the app
const PORT = process.env.PORT || 3001;


// Express static assets
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./Develop/public"));


app.use(routes);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server intiated port %d in %s mode", this.address().port, app.settings.env); 
  });