'use strict'
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let s = JSON.stringify(process.env, null, "\n");
  res.render('index', { title: 'Test Authentication', processdetails: s });
});

/* GET main page. */
router.get('/login', function(req, res, next) {
  let s = JSON.stringify(process.env, null, "\n");
  res.render('login', { title: 'Testing Login', processdetails: s });
});

router.post('/authenticate', function(req, res, next) {
  var x = '?email=' + req.body.email + '&password=' + req.body.password;
  res.redirect(301,'http://www.google.com' + x);
});

module.exports = router;