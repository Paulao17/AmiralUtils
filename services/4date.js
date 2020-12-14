const beginingOfTime = new Date("Feb 13 2017").getTime() // When History starts
const delta = beginingOfTime - new Date("Jan 1 0000").getTime()

// Returns a Date object where the time is not relective to your typical JC but JC
module.exports.getAdjustedDate = function() {
  return new Date(new Date().getTime() - delta)
}
