# Connect Cube Emitter

Emits [Cube events](https://github.com/square/cube/wiki/Emitter) for each response sent back by the server.

### Install

    npm install connect-cube-emitter

### Usage

Express server:

    var express = require('express');
    var emitter = require('connect-cube-emitter');
    var app = express();

    app.use(emitter());

    app.get('/', function(req, res){
      res.send('hello world');
    });

    app.listen(3000);


### Options

Cube collector address (default: *'ws://127.0.0.1:1080'*)

    app.use(emitter({ collector: 'udp://127.0.0.1:1180' }));


Event ```type``` (default: *request*)

    app.use(emitter({ type: 'express_request' }));
