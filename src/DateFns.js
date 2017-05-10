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

export default { initLocale, initMoment };
