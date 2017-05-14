import React, { PureComponent } from "react";
import { Text } from "react-native";

import styles from "./Calendar.style.js";

class CalendarHeader extends PureComponent {
  static propTypes = {
    calendarHeaderFormat: React.PropTypes.string.isRequired,
    calendarHeaderStyle: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.number
    ]),
    startingDate: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    calendarHeaderFormat: "MMMM YYYY"
  };

  //Function that formats the calendar header
  //It also formats the month section if the week is in between months
  formatCalendarHeader(startingDate, calendarHeaderFormat) {
    let firstDay = startingDate;
    let lastDay = startingDate.clone().add(6, "days");
    let monthFormatting = "";
    //Parsing the month part of the user defined formating
    if ((calendarHeaderFormat.match(/Mo/g) || []).length > 0) {
      monthFormatting = "Mo";
    } else {
      if ((calendarHeaderFormat.match(/M/g) || []).length > 0) {
        for (
          let i = (calendarHeaderFormat.match(/M/g) || []).length;
          i > 0;
          i--
        ) {
          monthFormatting += "M";
        }
      }
    }

    if (firstDay.month() === lastDay.month()) {
      return firstDay.format(calendarHeaderFormat);
    } else if (firstDay.year() !== lastDay.year()) {
      return `${firstDay.format(calendarHeaderFormat)} / ${lastDay.format(calendarHeaderFormat)}`;
    }

    return `${monthFormatting.length > 1 ? firstDay.format(monthFormatting) : ""} ${monthFormatting.length > 1 ? "/" : ""} ${lastDay.format(calendarHeaderFormat)}`;
  }

  render() {
    const headerText = this.formatCalendarHeader(
      this.props.startingDate,
      this.props.calendarHeaderFormat
    );
    return (
      <Text style={[styles.calendarHeader, this.props.calendarHeaderStyle]}>
        {headerText}
      </Text>
    );
  }
}

export default CalendarHeader;
