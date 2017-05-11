import moment from "moment";

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

function initMoment(date, locale) {
  if (locale && locale.name) {
    return moment(date).startOf("day").locale(locale.name);
  } else {
    return moment(date).startOf("day");
  }
}

function getStartOfWeek(moment, isoStartDay = 1) {
  let result = moment.clone().isoWeekday(isoStartDay);
  if (moment.isoWeekday() < isoStartDay) {
    return result.subtract(1, "week");
  } else {
    return result;
  }
}

function getSelectedDayOfWeek(selectedDate, isoStartDay) {
  let result = selectedDate.isoWeekday() - isoStartDay;
  if (result < 0) {
    result += 7;
  }
  return result;
}

export default { getSelectedDayOfWeek, getStartOfWeek, initLocale, initMoment };
