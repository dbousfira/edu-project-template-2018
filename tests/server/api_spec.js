const fs = require('fs');
const frisby = require('frisby');
const path = require('path');
const Joi = frisby.Joi;
const dal = require('../../src/server/repository.js');

const URL = `http://localhost:${process.env.SERVER_PORT}/api/episodes`;
const DATA_DIR = process.env.DATA;

beforeAll((done) => {
  createFakeEpisode(done);
});

function createFakeEpisode(done) {
  Promise.all([
    dal.insert("87897", "Breaking Bad", "S01E01", "8"),
    dal.insert("04893894", "Lethal Weapon", "S01E01", "7")
  ]).then(() => {
    done();
  });
}

afterAll((done) => {
  //deleteFakeEpisode(done);
});

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

let id;
describe('Add an episode', () => {
  it('should POST an episode', (done) => {
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
});

describe('Get all episodes', () => {
  it('should GET all episodes', (done) => {
    frisby.get(`${URL}`)
      .expect("status", 200)
      .expect('jsonTypes', '*', {
        'name': Joi.string().required(),
        'code': Joi.string().required(),
        'score': Joi.number().required()
      })
      .done(done);
  });
});

describe('Get an episode', () => {
  it('should GET an episode', (done) => {
    frisby.get(`${URL}/${id}`)
      .expect("status", 200)
      .expect('jsonTypes', {
        'name': Joi.string().required(),
        'code': Joi.string().required(),
        'score': Joi.number().required()
      })
      .done(done);
  });
});

describe('Get an unknown episode', () => {
  it('should not GET an episode', (done) => {
    frisby.get(`${URL}/toto`)
      .expect("status", 404)
      .done(done);
  });
});

describe('Update an episode', () => {
  it('should UPDATE an episode', (done) => {
    frisby.put(`${URL}/87897?name=MyUpdated&code=S01E01&score=0`)
      .expect("status", 200)
      .done(done);
  });
});

describe('Delete an episode', () => {
  it('should DELETE an episode', (done) => {
    frisby.del(`${URL}/04893894`)
      .expect("status", 200)
      .done(done);
  });
});

describe('Check files in data', () => {
  it('should have files in data', (done) => {
    fs.stat(path.join(DATA_DIR, `${id}.json`), (err, stats) => {
      if (err || !stats.isFile()) {
        fail();
      }
      done();
    });
  });
});