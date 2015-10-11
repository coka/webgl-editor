'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname));

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on http://localhost:%s/...', port);
});
