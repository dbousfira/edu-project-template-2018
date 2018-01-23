const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('./config.js');
const uuidv4 = require('uuid/v4');

// add a new episode
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
  res.send(loaded);
});

// delete an episode
router.delete('/:id', function(req, res) {
  var path = config.data + '/' + req.params.id + '.json';
  fs.unlinkSync(path, function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.end();
});

// get an episode by id
router.get('/:id', function(req, res) {
  var path = config.data + '/' + req.params.id + '.json';
  var file = require(path);
  if (file == null) {
    res.status(404).end();
  }
  else {
    res.send({
      name: file.name,
      code: file.code,
      score: file.score
    });
  }
});

router.put('/{id}', function(req, res) {
  res.send('PUT');
});

module.exports = router;
