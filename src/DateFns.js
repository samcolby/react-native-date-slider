import moment from "moment";

function initMoment(date, locale) {
  if (locale && locale.name) {
    return moment(date).startOf("day").locale(locale.name);
  } else {
    return moment(date).startOf("day");
  }
}

export default { initMoment };
