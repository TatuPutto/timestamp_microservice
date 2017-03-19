const moment = require('moment');

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

// format passed date string
module.exports = function formatTime(time) {
    // check if Unix timestamp
    if(new Date(time * 1000).getTime() > 0) {
        return createDateAndTimestamp(new Date(time * 1000));
    }

    // remove special characters and decode url
    const parsedTime = time.replace(/%20|[.,-]/g, ' ').replace(/  +/g, ' ').split(' ');

    // number or monthname
    var month;
    if(/^[0-9]+$/g.test(parsedTime[0])) {
        month = parsedTime[0] - 1;
        if(month > 11) {
            return {unix: null, natural: null};
        }
    } else {
        month = parsedTime[0];
    }

    // allow user to pass abridged year e.g. 17
    var year;
    if(parsedTime[2].length === 2) {
        year = '20' + parsedTime[2];
    } else {
        year = parsedTime[2];
    }

    // format date
    month = moment().month(month).format('MM');
    var day = moment().date(parsedTime[1]).format('DD');
    year = moment().year(year).format('YYYY');
    var formattedDate = month + '.' + day + '.' + year;

    // check if valid date
    const isValidDate = moment(formattedDate, 'MM.DD.YYYY', true).isValid();

    if(isValidDate) {
        return createDateAndTimestamp(new Date(formattedDate));
    }
    return {unix: null, natural: null};
}

// create date in human readable format and timestamp
function createDateAndTimestamp(date) {
    const unixTimeStamp = Math.round(date.getTime() / 1000);
    const naturalTime = monthNames[date.getMonth()] + ' ' +
            date.getDate() + ', ' + date.getFullYear();

    return JSON.stringify({unix: unixTimeStamp, natural: naturalTime});
}
