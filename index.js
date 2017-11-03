var express = require('express');
var request = require('request');
var async = require('async');
var yaml_config = require('yaml-config');
var config_path = './config.yml';
const fs = require('fs');

var services = yaml_config.readConfig(config_path);
var app = express();

fs.watchFile(config_path, function(pre, post){
  services = yaml_config.readConfig(config_path);
  console.log("Configuration changed");
});

app.get('/api/v1/services', function (req, res) {
  res.send(services);

  async.forEachOf(services, function(value, key){
    value.status = 'offline';
    if (typeof value.healthcheck !== "undefined") {
      var tmp_uri = value.healthcheck
    } else {
      var tmp_uri = value.uri
    }
    request.get(tmp_uri, function (error, response, body){
      if(response){
	if (response.statusCode >= 200 && response.statusCode < 400){
          value.status = 'online';
        }
      }
    });
  });
});
app.use(express.static('public'));

app.listen(3000);
