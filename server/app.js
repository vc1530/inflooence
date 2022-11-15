
// import express JS module into app
// and creates its variable.
var express = require('express');
var app = express();

// Creates a server which runs on port 3000 and
// can be accessed through localhost:3000
app.listen(8888, function() {
    console.log('server running on port 8888');
} )

const { spawn } = require('node:child_process');
const childPython = spawn('python3', ['main.py']);

childPython.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

