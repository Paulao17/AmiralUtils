var express = require('express');
const ical = require('node-ical');
const icalGen = require('ical-generator');
var router = express.Router();

/* GET Corrected ics calendar from educhorus */
router.get('/', function(req, res, next) {
  if (!req.query.code) // Check if code is provided
    return res.end('Please provide the Educ\'horus code with the code parameter!');

  ical.async.fromURL('https://educhorus.enteduc.fr/servlet/com.bloobyte.girafe.DoICalendar?code=' + req.query.code).then((events) => {
    const calendar = icalGen({
      domain: req.app.get('url'),
      name: 'Educhorus (corrected)',
      timezone: 'Europe/Paris',
      prodId: {
        company: 'Amiralutils',
        product: 'Educhorus (corrected)',
        language: 'FR'
      },
      url: req.app.get('url') + '/cal?code=' + req.query.code,
      scale: 'GREGORIAN',
      method: 'PUBLISH'
    });

    Object.keys(events).forEach((uid) => { // Events is an object
      event = events[uid]
      calendar.createEvent({
        start: event.start,
        end: event.end,
        summary: event.description.split('Matière : ')[1],
        description: event.summary,
        uid: event.uid,
        location: event.location,
        status: event.status,
        transparency: event.transparency
      });
    });

    calendar.serve(res, 'ehorus.ics');
  }).catch((err) => {
    console.log(err);
    res.status(500).end('Invalide Educ\'horus code or server error.')
  });
});

module.exports = router;
