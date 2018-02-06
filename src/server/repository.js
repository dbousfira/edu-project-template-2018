const json = require('json-update');
const fs = require('fs');
const config = require('./config.js');

let Repository = function() {

    let _path = function(id) {
        if (!id.endsWith('.json')) {
            id += '.json';
        }
        return config.data + '/' + id; 
    }

    let _modify = function(id, name, value) {
        return new Promise((resolve, reject) => {
            json.update(_path(id), {
                name: value
            }).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }
    
    let findById = function(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(_path(id), function(err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
    
    let findAll = function() {
        return new Promise((resolve, reject) => {
            fs.readdir(config.data, function(err, dir) {
                if (err) {
                    reject(err);
                }
                let promises = [];
                dir.forEach(function(file) {
                    promises.push(findById(file));
                });
                Promise.all(promises).then(function(data) {
                    resolve(data);
                }).catch(function(err) {
                    reject(err);
                });
            });
        });
    }
    
    let remove = function(id) {
        return new Promise((resolve, reject) => {
            fs.unlink(_path(id), function(err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
              });
        });
    }
    
    let insert = function(id, name, code, score) {
        return new Promise((resolve, reject) => {
            let data = {
                name: name, code: code, score: score
            };
            fs.writeFile(_path(id), JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(id);
                }
            });
        });
    }
    
    let update = function(id, ep) {
        return new Promise((resolve, reject) => {
            let promises = [];
            if (ep.name) 
                promises.push(_modify(id, 'name', ep.name));
            if (ep.code) 
                promises.push(_modify(id, 'code', ep.code));
            if (ep.score) 
                promises.push(_modify(id, 'score', ep.score));
            Promise.all(promises).then(function() {
                findById(id).then(function(data) {
                    resolve(data);
                }).catch(function(err) {
                    reject(err);
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    return {
        findAll: findAll,
        findById: findById,
        update: update,
        delete: remove,
        insert: insert
    }
}();

module.exports = Repository;