var express = require('express');
var router = express.Router();
var fs = require("fs");


//Route Prefix
module.exports = function (app) {
  app.use('/jianlian', router);
};

router.get('/inventories', function (req, res) {
  var filepath = process.env.PWD + '/app/mock/home/inventory.json';
  var data = readJsonFileSync(filepath);
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

router.get('/welcomeImages', function(req, res) {
  var filepath = process.env.PWD + '/app/mock/home/welcomeImages.json';
  var data = readJsonFileSync(filepath);
  res.setHeader('Content-Type', 'application/json');
  res.send(data);

});

router.get('/qrcode', function(req, res) {
  var filepath = process.env.PWD + '/app/mock/home/qrcode.json';
  var data = readJsonFileSync(filepath);
  res.setHeader('Content-Type', 'application/json');
  res.send(data);

});

router.get('/banner', function(req, res) {
  var filepath = process.env.PWD + '/app/mock/home/banner.json';
  var data = readJsonFileSync(filepath);
  res.setHeader('Content-Type', 'application/json');
  res.send(data);

});






function readJsonFileSync(filepath, encoding){

  if (typeof (encoding) == 'undefined'){
    encoding = 'utf8';
  }
  var file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

