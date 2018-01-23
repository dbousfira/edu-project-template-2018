const json = require('json-update');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const config = require('./config.js');

module.exports.findAll = function() {
    var loaded = [];
    fs.readdirSync(config.data).forEach(function(self) {
        var file = require(config.data + "/" + self);
        loaded.push({
            name : file.name, 
            code : file.code,
            score : file.score
        });
    });
    return loaded;
}

module.exports.findById = function(id) {
    var path = config.data + '/' + id + '.json';
    var file = require(path);
    return {
        name: file.name,
        code: file.code,
        score: file.score
    };
}

module.exports.delete = function(id) {
    var path = config.data + '/' + id + '.json';
    fs.unlinkSync(path, function(err) {
      if (err) {
        console.log(err);
        return false;
      }
    });
    return true;
}

module.exports.insert = function(name, code, score) {
    var id = uuidv4();
    var path = config.data + '/' + id + '.json';
    var data = {
        name: name,
        code: code,
        score: score
    };
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('It\'s saved!');
      }
    });
    return id;
}

module.exports.update = function(id, ep) {
    var path = config.data + '/' + id + '.json';
    if (ep.name)
    json.update(path, {
      name: ep.name
    }).then(function(dat) {
      console.log('Name updated!');
    });

    if (ep.code)
        json.update(path, {
        code: ep.code
        }).then(function(dat) {
        console.log('Code updated!');
        });

    if (ep.score)
        json.update(path, {
        score: ep.score
        }).then(function(dat) {
        console.log('Score updated!');
        });

    var file = require(path);
    return {
        name: ep.name ? ep.name : file.name,
        code: ep.code ? ep.code : file.code,
        score: ep.score ? ep.score : file.score
    };
}