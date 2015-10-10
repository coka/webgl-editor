"use strict";

var express = require("express");

var app = express();
app.use(express.static(__dirname));

var port = 8080;
app.listen(port, function() {
  console.log("Listening on http://localhost:%s/...", port);
});
