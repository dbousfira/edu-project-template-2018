const express = require('express');
const router = express.Router();
const repo = require('./repository.js');

// add a new episode
router.post('/', function(req, res) {
  var id = repo.insert(req.query.name, req.query.code, req.query.score);
  res.send(id);
});

// get episodes list
router.get('/', function(req, res) {
  var list = repo.findAll();
  res.send(list);
});

// get an episode by id
router.get('/:id', function(req, res) {
  var episode = repo.findById(req.params.id);
  if (episode == null) {
    res.status(404).end();
  }
  else {
    res.send(episode);
  }
});

// update an episode
router.put('/:id', function(req, res) {
  var json = repo.update(req.params.id, req.query);
  res.send(json);
});

// delete an episode
router.delete('/:id', function(req, res) {
  var deleted = repo.delete(req.params.id);
  if (deleted) {
    res.end();
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;