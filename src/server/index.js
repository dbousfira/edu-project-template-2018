const express = require('express');
const api = require('./api.js');
const config = require('./config.js');
var app = express();

app.use('/api/episodes', api);
app.listen(config.port);
