const frisby = require('frisby');

const URL = 'http://localhost:3000/api/episodes';

getEmpty = frisby.create('GET all episodes')
  .get(URL + '/')
  .expectStatus(200)
  .after(function() {
    frisby.create('POST an episode')
      .post(URL + '/', {
        name: "Lorem ipsum dolor sit amet",
        code: "S01E01",
        score: "10"
      }, {
        json: true
      })
      .expectStatus(201)
      .expectJSONTypes({
        id: String
      })
      .afterJSON(function(ep) {
        frisby.create('Get an episode')
          .get(URL + '/' + ep.id)
          .expectStatus(200)
          .expectJSONTypes({
            id: String,
            name: String,
            code: String,
            score: String
          })
          .expectJSON({
            name: "Lorem ipsum dolor sit amet",
            code: "S01E01",
            score: "10"
          })
          .afterJSON(function(ep) {
            frisby.create('Delete an ep')
              .delete(URL + '/' + ep.id)
              .expectStatus(204)
              .toss();
          })
          .toss();
        frisby.create('Get an unknow ep')
          .get(URL + '/aaaa')
          .expectStatus(404)
          .toss();
      }).toss();
  }).toss();