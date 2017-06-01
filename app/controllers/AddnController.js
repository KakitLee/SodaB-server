var express = require('express'),
    router = express.Router();


//Route Prefix
module.exports = function (app) {
  app.use('/addn', router);
};

router.get('/data', function (req, res) {
  res.send({
    'a' : 10,
    'a_avg': 12,
    'b': 21,
    'b_avg': 15,
    'c': 8,
    'c_avg': 19
  });
});

router.post('/data', function (req, res) {
   console.dir(req);
});
