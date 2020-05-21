var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.use('/', express.static('./'));
serv.listen(80);