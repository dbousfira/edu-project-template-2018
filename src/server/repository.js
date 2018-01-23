const json = require('json-update');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const config = require('./config.js');

var path = (id) => {
    if (!id.endsWith('.json')) {
        id += '.json';
    }
    return config.data + '/' + id; 
}

module.exports.findAll = function() {
    var loaded = [];
    fs.readdirSync(config.data).forEach(function(self) {
        var file = require(path(self));
        loaded.push({ 
            name : file.name, code : file.code, score : file.score
        });
    });
    return loaded;
}

module.exports.findById = function(id) {
    var file = require(path(id));
    return {
        name: file.name,
        code: file.code,
        score: file.score
    };
}

module.exports.delete = function(id) {
    fs.unlinkSync(path(id), function(err) {
      if (err) {
        console.log(err);
        return false;
      }
    });
    return true;
}

module.exports.insert = function(name, code, score) {
    var id = uuidv4();
    var data = {
        name: name, code: code, score: score
    };
    fs.writeFile(path(id), JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);
      }
    });
    return id;
}

module.exports.update = function(id, ep) {
    if (ep.name) {
        json.update(path(id), {
            name: ep.name
        });
    }
    if (ep.code) {
        json.update(path(id), {
            code: ep.code
        });
    }
    if (ep.score) {
        json.update(path(id), {
            score: ep.score
        });
    }
    var file = require(path(id));
    return {
        name: ep.name ? ep.name : file.name, code: ep.code ? ep.code : file.code, score: ep.score ? ep.score : file.score
    };
}