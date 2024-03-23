const express = require('express'),
    mongoose = require('mongoose'),
    app = require('./app'),
    { server } = require('./config/environment.variables.config');

const PORT = server.port;

// DB is not safe now because its demo and local. 
mongoose.connect('mongodb://localhost/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });