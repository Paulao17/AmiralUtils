var express = require('express');
var router = express.Router();
var vacation = require('../services/vacation')
require('../services/dateweek')

/* GET Page indicating the week. */
router.get('/week.html', function(req, res, next) {
  date = new Date(); // now
  var week = date.getWeek(); // Week number
  monday = new Date();
  monday.setDate(date.getDate() - date.getDay() + 1); // Set day to Monday, Date considers that the week starts on Sunday
  sunday = new Date();
  sunday.setDate(date.getDate() - date.getDay() + 7 );

  res.render('week', {
    title: 'Week',
    week: week,
    even: week % 2 ? 'impaire' : 'paire', // Wether the week number is even
    date: date.toLocaleDateString(),
    monday: monday.toLocaleDateString(),
    sunday: sunday.toLocaleDateString(),
    onVacation: vacation.onVacation(),
    nextVacation: vacation.nextVacation()
  });
});

/* GET Page indicating the week. */
router.get('/week.json', function(req, res, next) {
  res.json({
    time: Date.now(),
    week: new Date().getWeek(),
    nextVacation: vacation.nextVacation(),
    onVacation: vacation.onVacation()
  })
});

module.exports = router;
