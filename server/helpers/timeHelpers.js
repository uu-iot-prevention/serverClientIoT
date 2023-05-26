const moment = require("moment-timezone");

function addMinutesToCurrentDate(minutes) {
  const now = moment();
  const timeZone = moment.tz.guess(); // Získání aktuální časové zóny
  const targetDate = now.add(minutes, "minutes").tz(timeZone);

  const isoString = targetDate.toISOString();
  console.log(isoString);
  return isoString;
}

module.exports = { addMinutesToCurrentDate };
