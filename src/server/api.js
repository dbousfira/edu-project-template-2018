const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('./config.js');
const uuidv4 = require('uuid/v4');

// define the home page route
router.get('/', function(req, res) {
  res.send('GET');
});

// OK
router.post('/', function(req, res) {
  req.query.id = uuidv4();
  fs.writeFile(config.data + '/' + req.query.id + '.json', JSON.stringify(req.query), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });

  res.send(req.query);
});

// get episodes list
router.get('/', function(req, res) {
  var loaded = [];
  fs.readdirSync(config.data).forEach(function(self) {
      var file = require(config.data + "/" + self);
      loaded.push({
          name : file.name, 
          code : file.code,
          score : file.score
      });
  });
  res.end();
  return loaded;
});

router.get('/{id}', function(req, res) {
  fs.readFile('/../../data/episodes.json', (err, data) => {
  if (err) throw err;
  console.log(data);
});
  res.send('GET all');
});

router.delete('/{id}', function(req, res) {
  res.send('DELETE');
});

router.put('/{id}', function(req, res) {
  res.send('PUT');
});

module.exports = router;
