const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

module.exports = {

  convertNumberToMonth: (number) => {
    return months[number];
  },

  convertMonthToNumber: (month) => {
    const index = months.indexOf(month);
    if (index == -1) {
      console.log(`Unable to convert ${month} into a number`);
    }
    return index;
  },
  
  dateOrdinal: (dom) => {
    if (dom == 31 || dom == 21 || dom == 1) return dom + "st";
    else if (dom == 22 || dom == 2) return dom + "nd";
    else if (dom == 23 || dom == 3) return dom + "rd";
    else return dom + "th";
  },

  getCurrentYear: () => {
    const today = new Date();
    return today.getFullYear();
  },

  getTimeStamp: () => {
    const date = new Date(); 
    // Hour
    let hour = date.getHours().toString();
    if (hour.length === 1) {hour = "0" + hour;}
    // Minutes
    let minutes = date.getMinutes().toString();
    if (minutes.length === 1) {minutes = "0" + minutes;}
    // Seconds
    let seconds = date.getSeconds().toString();
    if (seconds.length === 1) {seconds = "0" + seconds;}
    // Milli Seconds
    let milliSeconds = date.getMilliseconds().toString();
    if (milliSeconds.length === 1) {milliSeconds = "00" + milliSeconds};
    if (milliSeconds.length === 2) {milliSeconds = "0" + milliSeconds};
    // Stemp
    return "[" + hour + "-" + minutes + "-" + seconds + "-" + milliSeconds + "]";
  },

};
