const moment = require('moment');

const validDateFormats = ['MM,DD,YYYY', 'MM-DD-YYYY'];
const monthNames = [
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
    'December'
];

module.exports = function formatTime(time) {
    const isValidDate = moment(time, validDateFormats).isValid();
    const isValidTimestamp = new Date(time * 1000).getTime() > 0;

    if(isValidDate || isValidTimestamp) {
        const date = isValidDate ?
                date = new Date(time) : new Date(time * 1000);

        const unixTimeStamp = Math.round(date.getTime() / 1000);
        const naturalTime = monthNames[date.getMonth()] + ' ' +
                date.getDate() + ', ' + date.getFullYear();
        return {unix: unixTimeStamp, natural: naturalTime};
    }
    return {unix: null, natural: null};
}
