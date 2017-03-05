var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    apn = require('apn'),
    path = require('path'),
    multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + Math.floor((Math.random() * 100) + 1) + '.' + 'pem')
  }
});
var upload = multer({ storage: storage });

const rootPath = path.normalize(__dirname + '/../..');
const fs = require('fs');

//Route Prefix
module.exports = function (app) {
  app.use('/api', router);
};

router.get('/apns', function (req, res) {
  res.send('Hello world');
});

router.post('/apns/send-message', function (req, res) {
  //var id = req.query.id; // $_GET["id"]
  sendNotification(req.body, res);
});

router.post('/apns/file-upload/certificate',  upload.single('certificate'), function (req, res) {
  res.send({ status: 'success', filename: req.file.filename.split('.')[0]});

});

router.post('/apns/file-upload/key',  upload.single('key'), function (req, res) {
  res.send({ status: 'success', filename: req.file.filename.split('.')[0]});
});


function sendNotification(request, res){
  console.dir('request = ',request);
  var options = {
    cert: rootPath + '/uploads/' + request.certificateName + '.pem',
    key: rootPath + '/uploads/' + request.keyName + '.pem',
    production: request.isProduction === "true"
  };
  //var deviceToken = 'e93fb07ebf3b8526156879021b01cfa2389e22560385236d6bde733e7ed05e8d';
  var deviceToken = request.deviceToken;
  var apnProvider = new apn.Provider(options);
  var note = new apn.Notification();

  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 1;
  note.sound = 'ping.aiff';
  note.alert = "\uD83D\uDCE7 \u2709 " + request.message;
  note.payload = {'messageFrom': 'Caroline'};

  apnProvider.send(note, deviceToken).then( (result) => {

      console.dir(result);
    if(result.failed.length !== 0){
      res.status(400);
      res.send({ status: 'failed', message: result.failed[0].response.reason});
    }else{
      res.send({ status: 'success', message: 'Notification has been delivered..!!!'});
    }
 });
}
