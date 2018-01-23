const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('./config.js');
const uuidv4 = require('uuid/v4');

// add a new episode
router.post('/', function(req, res) {
  var id = uuidv4();
  fs.writeFile(config.data + '/' + id + '.json', JSON.stringify(req.query), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });

  res.send(id);
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

router.put('/:id', function(req, res) {
  var ep = req.query;

  if (ep.name)
    json.update(config.data + '/' + req.params.id + '.json', {
      name: ep.name
    }).then(function(dat) {
      console.log('Name updated!');
    });

  if (ep.code)
    json.update(config.data + '/' + req.params.id + '.json', {
      code: ep.code
    }).then(function(dat) {
      console.log('Code updated!');
    });

  if (ep.score)
    json.update(config.data + '/' + req.params.id + '.json', {
      score: ep.score
    }).then(function(dat) {
      console.log('Score updated!');
    });

  res.send('PUT');
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


module.exports = router;
