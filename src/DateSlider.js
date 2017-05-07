import React from "react";
import { Dimensions } from "react-native";

import moment from "moment";
import _ from "lodash";

import DateSliderComponent from "./DateSliderComponent";

class DateSlider extends React.Component {
  flatlist = undefined;
  selectedIndex = 0;
  viewableIndex = -1;

  constructor(props) {
    super(props);

    // The very first date in the FlatList
    const startingDate = moment().isoWeekday(1).subtract(4, "weeks");

    this.state = {
      viewWidth: Dimensions.get("window").width,
      arrDates: this._generateDates(startingDate, 9, moment()),
      selectedDate: moment().startOf("day")
    };
  }

  render() {
    return (
      <DateSliderComponent
        arrDates={this.state.arrDates}
        captureFlatListRef={this._captureFlatListRef}
        viewWidth={this.state.viewWidth}
        getItemLayout={this._getItemLayout}
        onDateSelected={this._onDateSelected}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={3}
        onLayout={this._onLayout}
        onViewableItemsChanged={this._onViewableItemsChanged}
      />
    );
  }

  _generateDates(fromDate, weeks, selectedDate) {
    const startOfSelectedWeek = selectedDate.clone().isoWeekday(1);

    return _.map(_.range(weeks), i => {
      const weekStartDate = fromDate.clone().add(i, "weeks").startOf("day");
      if (startOfSelectedWeek.isSame(weekStartDate, "day")) {
        this.selectedIndex = i;
      }
      return {
        key: weekStartDate.toISOString(),
        date: weekStartDate,
        arrSelected: this._generateArrSelected(
          weekStartDate,
          startOfSelectedWeek,
          selectedDate
        )
      };
    });
  }

  _generateArrSelected(weekStartDate, startOfSelectedWeek, selectedDate) {
    let result = [false, false, false, false, false, false, false];
    if (weekStartDate && weekStartDate.isSame(startOfSelectedWeek, "day")) {
      result[selectedDate.isoWeekday() - 1] = true;
    }
    return result;
  }

  _captureFlatListRef = flatlist => (this.flatlist = flatlist);

  _getItemLayout = (data, index) => {
    return {
      length: this.state.viewWidth,
      offset: this.state.viewWidth * index,
      index
    };
  };

  _onLayout = event => {
    const nativeEvent = event.nativeEvent;
    this.setState({ viewWidth: nativeEvent.layout.width });
    if (this.viewableIndex === -1) {
      this._scrollTo(this.selectedIndex);
    } else {
      this._scrollTo(this.viewableIndex);
    }
  };

  _scrollTo = index => {
    const scrollToPromise = new Promise(resolve => setTimeout(resolve, 0));
    scrollToPromise.then(() => {
      this.flatlist.scrollToIndex({
        viewPosition: 0,
        index: index,
        animated: false
      });
    });
  };

  _onEndReached = () => {
    const append1Week = this.state.arrDates[this.state.arrDates.length - 1].date
      .clone()
      .add(1, "weeks");
    const arrNewDates = this._generateDates(
      append1Week,
      4,
      this.state.selectedDate
    );
    this.setState({ arrDates: [...this.state.arrDates, ...arrNewDates] });
  };

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length === 1) {
      this.viewableIndex = viewableItems[0].index;
    }
    //console.log("viewable " + JSON.stringify(viewableItems));
    // console.log("changed " + JSON.stringify(changed));
    if (
      _.get(changed[0], "index") === 2 &&
      _.get(viewableItems[0], "index") === 1 &&
      !_.get(changed[0], "isViewable")
    ) {
      const prepend4Weeks = this.state.arrDates[0].date
        .clone()
        .subtract(4, "weeks");
      const arrNewDates = this._generateDates(
        prepend4Weeks,
        4,
        this.state.selectedDate
      );
      this.setState({ arrDates: [...arrNewDates, ...this.state.arrDates] });
      this.selectedIndex = this.selectedIndex + 4;
      this._scrollTo(1 + 4);
    }
  };

  _onDateSelected = date => {
    const startOfSelectedWeek = date.clone().isoWeekday(1);

    let arrDates = [...this.state.arrDates];
    const prevSelected = _.findIndex(arrDates, [
      "key",
      this.state.selectedDate.clone().isoWeekday(1).toISOString()
    ]);
    const selected = _.findIndex(arrDates, [
      "key",
      startOfSelectedWeek.toISOString()
    ]);

    arrDates[prevSelected].arrSelected = this._generateArrSelected();
    arrDates[selected].arrSelected = this._generateArrSelected(
      arrDates[selected].date,
      startOfSelectedWeek,
      date
    );

    this.selectedIndex = _.findIndex(arrDates, [
      "key",
      startOfSelectedWeek.toISOString()
    ]);

    this.setState({
      arrDates: arrDates,
      selectedDate: date
    });
  };
}

export default DateSlider;
