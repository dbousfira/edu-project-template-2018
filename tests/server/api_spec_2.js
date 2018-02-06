const fs = require('fs');
const frisby = require('frisby');
const path = require('path');
const Joi = frisby.Joi;
const dal = require('../../src/server/repository.js');

const URL = `http://localhost:${process.env.SERVER_PORT}/api/episodes`;
const DATA_DIR = process.env.DATA;

function createFakeEpisode(done) {
  Promise.all([
    dal.insert("87897", "Breaking Bad", "S01E01", "8"),
    dal.insert("04893894", "Lethal Weapon", "S01E01", "7")
  ]).then(() => {
    done();
  });
}

function deleteFakeEpisode(done) {
  fs.readdir(DATA_DIR, (err, files) => {
    if (err) {
      done();
      throw err
    }
    for (const file of files) {
      dal.delete(file).then(() => {
        done();
      }).catch((err) => {
        console.log(err);
        done();
      });
    }
  });
}

describe('Add an episode', () => {
  let id;
  it('should make an http request', (done) => {
    frisby.post(`${URL}?name=Blindspot&code=S03E02&score=5`)
      .expect('status', 201)
      .expect('jsonTypes', {
        'id': Joi.string().required(),
        'name': Joi.string().required(),
        'code': Joi.string().required(),
        'score': Joi.number().required()
      }).then((res) => {
        id = res.body.id;
      })
      .done(done);
  });

  it('should GET all episodes', function(done) {
    frisby.get(URL)
      .expect("status", 200)
      .expect('jsonTypes', '*', {
        'name': Joi.string().required(),
        'code': Joi.string().required(),
        'score': Joi.number().required()
      })
      .done(done);
  });

  it('should have file in data', (done) => {
    fs.stat(path.join(DATA_DIR, `${id}.json`), (err, stats) => {
      if (err || !stats.isFile()) {
        fail();
      }
      done();
    });
  });
});