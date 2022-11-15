
//Import express.js module and create its variable.
const express=require('express');
const app=express();

//Import PythonShell module.
var {PythonShell} =require('python-shell');

// var SPOTIPY_CLIENT_SECRET = "ba457fdecdc3453c87b7e5aaba0123fc"
// var SPOTIPY_CLIENT_ID = "0048909068294db1b98e49ed9c7d5dc8"
// var SPOTIPY_REDIRECT_URI = "http://localhost:8888/callback"
//Router to handle the incoming request.
app.get("/", (req, res, next)=>{
    //Here are the option object in which arguments can be passed for the python_test.js.
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
//          scriptPath: 'main.py', //If you are having python_test.py script in same folder, then it's optional.
//        args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1]
    };
    PythonShell.run('main.py', options, function (err, result){
          if (err) throw err;
          // result is an array consisting of messages collected
          //during execution of script.
          console.log('result: ', result.toString());
          res.send(result.toString())
    });
});

//Creates the server on default port 8888 and can be accessed through localhost:8000
const port=8888;
app.listen(port, ()=>console.log(`Server connected to ${port}`));


// // import express JS module into app
// // and creates its variable.
// var express = require('express');
// var app = express();

// // Creates a server which runs on port 3000 and
// // can be accessed through localhost:3000
// app.listen(8888, function() {
//     console.log('server running on port 8888');
// } )

// const { spawn } = require('node:child_process');
// const childPython = spawn('python3', ['main.py']);

// childPython.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

