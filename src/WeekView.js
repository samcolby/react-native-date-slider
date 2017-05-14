import React, { PureComponent } from "react";
import { View } from "react-native";

import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";

const DAYS_TO_GENERATE_ARRAY = [1, 2, 3, 4, 5, 6];

class WeekView extends PureComponent {
  static propTypes = {
    startingDate: React.PropTypes.object.isRequired,
    arrSelected: React.PropTypes.array.isRequired,
    onDateSelected: React.PropTypes.func.isRequired,
    viewWidth: React.PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      arrDays: this.generateArrDays(this.props.startingDate)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startingDate !== this.state.arrDays[0]) {
      this.setState({
        arrDays: this.generateArrDays(nextProps.startingDate)
      });
    }
  }

  /**
   * Generates an array of the days for this week.
   * This uses the passed in startingDate as the first day of the array
   * so as to keep the CalendarDays working as a PureComponent
   *
   * @param {moment} startingDate
   *  The starting date for this week
   * @returns {Array<moment>}
   *  An array of moment instances representing the week
   *
   * @memberof WeekView
   */
  generateArrDays(startingDate) {
    return [
      startingDate,
      ...DAYS_TO_GENERATE_ARRAY.map(i => startingDate.clone().add(i, "days"))
    ];
  }

  render() {
    const { arrDays } = this.state;

    const arrCalendarDays = arrDays.map((date, i) => {
      return (
        <CalendarDay
          key={date.toISOString()}
          date={date}
          onDateSelected={this.props.onDateSelected}
          selected={this.props.arrSelected[i]}
        />
      );
    });

    return (
      <View style={{ flexGrow: 1, height: 100 }}>
        <CalendarHeader startDate={this.props.startingDate} />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            width: this.props.viewWidth
          }}
        >
          {arrCalendarDays}
        </View>
      </View>
    );
  }
}

export default WeekView;
