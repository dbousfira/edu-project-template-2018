const express = require('express');
const router = express.Router();
const repo = require('./repository.js');
const uuidv4 = require('uuid');

// add a new episode
router.post('/', function(req, res) {
  let id = uuidv4();
  repo.insert(id, req.query.name, req.query.code, req.query.score).then((id) => {
    res.status(201).send({
      'id': id,
      'name': req.query.name,
      'code': req.query.code,
      'score': req.query.score
    });
  }).catch((err) => {
    console.log(err);
    res.status(400).end();
  });
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
  });
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
  repo.delete(req.params.id).then(() => {
    res.status(200).end();
  }).catch((err) => {
    res.status(404).end();
  });
});

module.exports = router;