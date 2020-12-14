const dates = [{
    start: new Date(2020, 9, 16, 18),
    end: new Date(2020, 10, 2, 8)
  },
  {
    start: new Date(2020, 11, 18, 18),
    end: new Date(2021, 0, 4, 8)
  }, {
    start: new Date(2021, 1, 20, 18),
    end: new Date(2021, 2, 8, 8)
  }
]

const day = 24 * 3600 * 1000; // One day, in ms
const hour = 3600 * 1000; // One hour, is ms
const minute = 60 * 1000; // One minute, in ms

/* Returns weither the given date is during school vacation */
module.exports.onVacation = (now = Date.now()) => {
  //now = new Date(2020, 9, 17).getTime()
  for (i = 0; i < dates.length; i++) {
    if (dates[i].start.getTime() < now && now < dates[i].end.getTime()) return true;
  }
  return false;
}

module.exports.nextVacation = (now = Date.now()) => {
  //now = new Date(2020, 9, 17).getTime()
  delta = 0;
  for (i = 0; i < dates.length; i++) {
    if (now < dates[i].start.getTime()) {
      delta = dates[i].start.getTime() - now;
      break;
    }
  }
  if (delta === 0)
    return 'Semblerait que y\'ait plus de vacances :sob:.';

  days = Math.floor(delta / day);
  hours = Math.floor((delta % day) / hour);
  minutes = Math.floor((delta % hour) / minute);
  seconds = Math.floor((delta % minute) / 1000);

  string = '';

  if (days > 0) string += `${days} jour${days == 1 ? '' : 's'} `;
  if (hours > 0) string += `${hours} heure${hours == 1 ? '' : 's'} `;
  if (minutes > 0) string += `${minutes} minute${minutes == 1 ? '' : 's'} `;
  if (string.length > 0 && seconds > 0) string += 'et ';
  if (seconds > 0) string += `${seconds} seconde${seconds == 1 ? '' : 's'}`
  return string;
}
