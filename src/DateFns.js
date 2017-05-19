import moment from "moment";

/**
 * Initializes the moment with the passed in locale data
 *
 * @param {string} name
 *  The name of the locale being setup
 * @param {Object} config
 *  The configuration details of this locale see https://momentjs.com/docs/#/i18n/changing-locale/
 */
function initLocale(name, config) {
  try {
    moment.locale(name, config);
  } catch (error) {
    throw new Error(
      "Locale prop is not in the correct format. \n Locale has to be in form of object, with keys of name and config. " +
        error.message
    );
  }
}

/**
 * Initializes the passed in moment.
 * This function sets the time to the start of the day and configures the locale
 * if one is passed in
 *
 * @param {any} date
 *  Anything accepted by a moment(<value>) call
 * @param {Object} locale
 *  The locale to be used in this moment
 * @returns {moment}
 *  This initialized moment
 */
function initMoment(date, locale) {
  if (locale && locale.name) {
    return moment(date).startOf("day").locale(locale.name);
  } else {
    return moment(date).startOf("day");
  }
}

/**
 * Gets the first day of the week based on the isoStartDay
 *
 * @param {moment} moment
 *  One of the days within the week you want the start day of
 * @param {number} [isoStartDay=1]
 *  The isoWeekday being used to start each week
 * @returns {moment}
 *  A new momnent instance representing the first day of the week
 */
function getStartOfWeek(moment, isoStartDay = 1) {
  let result = moment.clone().isoWeekday(isoStartDay);
  if (moment.isoWeekday() < isoStartDay) {
    return result.subtract(1, "week");
  } else {
    return result;
  }
}

/**
 * Returns the position (from 0 to 6) of the selectedDate based on the isoStartDay
 * eg if isoStartDay is isoWeekday=3 and the selectedDate is isoWeekday=4
 * then this function will return 1.
 *
 * This is used to locate the correct date in the _generateArrSelected function
 * to set the correct date as selected.
 *
 *
 * @param {moment} selectedDate
 *  The date that is selected
 * @param {number} [isoStartDay=1]
 *  The isoWeekday being used to start each week
 * @returns {number}
 *  Indicating the position of the selectedDate based on the isoStartDay
 */
function getSelectedDayOfWeek(selectedDate, isoStartDay = 1) {
  let result = selectedDate.isoWeekday() - isoStartDay;
  if (result < 0) {
    result += 7;
  }
  return result;
}

export default { getSelectedDayOfWeek, getStartOfWeek, initLocale, initMoment };
