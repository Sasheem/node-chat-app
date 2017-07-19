// create express app
// configure express static middleware
// app.listen to start server on port 3000
// callback to say server is up on port 3000
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`server started up one port ${port}`);
});

module.exports = {app};
