const express = require('express');
const validateZip = require('./middleware/validateZip');
const getZoos = require('./utils/getZoos');

const app = express();

//ROUTES:
//Route 3
app.get("/zoos/all", (req, res, next) => {
  const admin = req.query.admin;

  if (admin === "true") { 
    const zooList = getZoos().join("; "); 
    res.send(`All zoos: ${zooList}`); 
  } else { 
    res.send("You do not have access to that route."); 
  }
  next()
});

//Route 2
app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zooList = getZoos(zip);
  
  if (zooList != 0) {
    res.send(`${zip} zoos: ${zooList.join("; ")}`)
  } else {
    res.send(`${zip} has no zoos.`)
  }
  next()
});

//Route 1
app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zooList = getZoos(zip);

  if (zooList) {
    const message = `${zip} exists in our records.`;
    res.send(message);
  } else {
    const message = `${zip} does not exist in our records.`;
    res.send(message);
  }
  next()
});

//ERROR HANDLERS
//Not Found handler
app.use((req, res, next) => {
  res.send(`That route could not be found!`);
});

//Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

module.exports = app;