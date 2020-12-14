var express = require('express');
var router = express.Router();
var date = require('../services/4date')

/* GET Page indicating the date ;). */
router.get('/', function(req, res, next) {
  res.render('week', {
    title: 'la date',
    date: date.getAdjustedDate().toLocaleDateString(),
  });
});

module.exports = router;
