const express = require('express');
const router = express.Router();
const repo = require('./repository.js');

// add a new episode
router.post('/', function(req, res) {
<<<<<<< HEAD
  repo.insert(req.query.name, req.query.code, req.query.score).then((id) => {
    res.status(201).send(id);
  }).catch((err) => {
    console.log(err);
    res.status(400).end();
  });
=======
  var id = repo.insert(req.query.name, req.query.code, req.query.score);
  console.log("POST");
  res.status(201).send(id);
>>>>>>> 38f0c9ade8bd34fbcc8a8f989df52261441a71fc
});

// get episodes list
router.get('/', function(req, res) {
  repo.findAll().then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.log(err);
    res.status(500).end();
  });
});

// get an episode by id
router.get('/:id', function(req, res) {
  repo.findById(req.params.id).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.log(err);
    res.status(404).end();
<<<<<<< HEAD
  });
=======
  } else {
    res.send(episode);
  }
>>>>>>> 38f0c9ade8bd34fbcc8a8f989df52261441a71fc
});

// update an episode
router.put('/:id', function(req, res) {
  repo.update(req.params.id, req.query).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.log(err);
    res.status(404).end();
  })
});

// delete an episode
router.delete('/:id', function(req, res) {
<<<<<<< HEAD
  repo.delete(req.params.id).then(() => {
    res.status(202).end();
  }).catch((err) => {
=======
  var deleted = repo.delete(req.params.id);
  if (deleted) {
    res.status(204).end();
  } else {
>>>>>>> 38f0c9ade8bd34fbcc8a8f989df52261441a71fc
    res.status(404).end();
  });
});

module.exports = router;