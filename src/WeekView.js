import React, { PureComponent } from "react";
import { View } from "react-native";

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
      // REM this shouldn't ever really be called
      // as the starting date should always be the same for each week
      this.setState({
        arrDays: this.generateArrDays(nextProps.startingDate)
      });
    }
  }

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
          selected={this.props.arrSelected[i]}
          onDateSelected={this.props.onDateSelected}
        />
      );
    });

    return (
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
    );
  }
}

export default WeekView;
