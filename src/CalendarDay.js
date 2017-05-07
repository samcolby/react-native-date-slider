/**
 * Created by bogdanbegovic on 8/20/16.
 */

import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./Calendar.style.js";

export default class CalendarDay extends PureComponent {
  static propTypes = {
    date: React.PropTypes.object.isRequired,
    onDateSelected: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired,

    calendarColor: React.PropTypes.string,

    dateNameStyle: React.PropTypes.any,
    dateNumberStyle: React.PropTypes.any,
    todayDateNameStyle: React.PropTypes.any,
    todayDateNumberStyle: React.PropTypes.any,
    weekendDateNameStyle: React.PropTypes.any,
    weekendDateNumberStyle: React.PropTypes.any,
    highlightDateNameStyle: React.PropTypes.any,
    highlightDateNumberStyle: React.PropTypes.any,
    styleWeekend: React.PropTypes.bool,

    daySelectionAnimation: React.PropTypes.object,

    width: React.PropTypes.number
  };

  static defaultProps = {
    styleWeekend: true,
    showDayName: true,
    showDayNumber: true
  };

  constructor(props) {
    super(props);
  }

  isToday(thisMoment) {
    return thisMoment.isSame(new Date(), "d");
  }

  render() {
    let dateNameStyle = [styles.dateName];
    let dateNumberStyle = [styles.dateNumber];
    let dateViewStyle = [];

    dateNameStyle = [styles.dateName, this.props.dateNameStyle];
    dateNumberStyle = [styles.dateNumber, this.props.dateNumberStyle];
    if (
      this.props.styleWeekend &&
      (this.props.date.isoWeekday() === 6 || this.props.date.isoWeekday() === 7)
    ) {
      dateNameStyle = [styles.weekendDateName, this.props.weekendDateNameStyle];
      dateNumberStyle = [
        styles.weekendDateNumber,
        this.props.weekendDateNumberStyle
      ];
    }
    if (
      (this.props.todayDateNameStyle || this.props.todayDateNumberStyle) &&
      this.isToday(this.props.date)
    ) {
      if (this.props.todayDateNameStyle) {
        dateNameStyle = [...dateNameStyle, this.props.todayDateNameStyle];
      }
      if (this.props.todayDateNumberStyle) {
        dateNumberStyle = [...dateNumberStyle, this.props.todayDateNumberStyle];
      }
    }
    if (this.props.selected) {
      dateNameStyle = [styles.dateName, this.props.highlightDateNameStyle];
      dateNumberStyle = [
        styles.dateNumber,
        this.props.highlightDateNumberStyle
      ];
      dateViewStyle = { backgroundColor: "red" };
    }

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={this.props.onDateSelected.bind(this, this.props.date)}
          style={{}}
        >
          <View
            key={this.props.date}
            style={[styles.dateContainer, dateViewStyle]}
          >
            <Text style={dateNameStyle}>
              {this.props.date.format("ddd").toUpperCase()}
            </Text>

            <Text style={dateNumberStyle}>{this.props.date.date()}</Text>

          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
