function awsIsoDateTime(awsDate) {

  let awsOffsetFlag = (awsDate.getTimezoneOffset() == 0) ? 'Z' : ((awsDate.getTimezoneOffset() > 0) ? 'UTC -' : 'UTC +')

  let awsAbsoluteOffset = Math.abs(awsDate.getTimezoneOffset())

  let awsHoursOffset = awsOffsetFlag == 'Z' ? '' : ((awsAbsoluteOffset / 60) < 10) ? ('0' + parseInt(awsAbsoluteOffset / 60)) : (parseInt(awsAbsoluteOffset / 60))

  let awsMinutesOffset = awsOffsetFlag == 'Z' ? '' : ((awsAbsoluteOffset % 60) < 10) ? ('0' + parseInt(awsAbsoluteOffset % 60)) : (parseInt(awsAbsoluteOffset % 60))

  let awsString = '(' + awsOffsetFlag + awsHoursOffset + ':' + awsMinutesOffset + ')'

  return awsString
}

awsIsoDateTime(new Date())

// Adapted from: http://alanwsmith.com/iso-8601-time-stamp-snippet-for-textexpander

// I edited the original code so this is just the offset

/*
  Also check out these interesting articles

    https://leancrew.com/all-this/2015/07/javascript-date-manipulations-in-textexpander/

    https://www.asianefficiency.com/technology/save-time-with-expert-level-textexpander-snippets/

    https://ryanmo.co/2014/05/10/show-time-in-multiple-time-zones-with-textexpander/

  A list of all the U.S. time zones: https://www.timeanddate.com/time/zones/na
    NOTE: Could I create a switch statement in order to plug in the proper time zone abbreviation?
*/
