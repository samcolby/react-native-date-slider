import React from "react";
import { Dimensions } from "react-native";

import _ from "lodash";

import DateFns from "./DateFns";

import DateSliderComponent from "./DateSliderComponent";

const END_THRESHOLD = 4;
const EXTEND_WEEKS_BY = 8;

class DateSlider extends React.Component {
  static propTypes = {
    isoStartDay: React.PropTypes.number,
    locale: React.PropTypes.object,
    onDateSelected: React.PropTypes.func,
    onWeekChanged: React.PropTypes.func,
    selectedDate: React.PropTypes.object
  };

  static defaultProps = {
    isoStartDay: 1
  };

  flatlist = undefined;
  selectedIndex = 0;
  viewableIndex = -1;
  isExpanding = false;

  constructor(props) {
    super(props);

    if (props.locale && props.locale.name && props.locale.config) {
      DateFns.initLocale(props.locale.name, props.locale.config);
    }

    let selectedDate;
    if (this.props.selectedDate) {
      selectedDate = DateFns.initMoment(this.props.selectedDate, props.locale);
    } else {
      selectedDate = DateFns.initMoment(new Date(), props.locale);
    }

    // The very first date in the FlatList
    const startingDate = DateFns.getStartOfWeek(
      selectedDate,
      props.isoStartDay
    ).subtract(EXTEND_WEEKS_BY, "weeks");

    this.state = {
      viewWidth: Dimensions.get("window").width,
      arrDates: this._generateDates(
        startingDate,
        EXTEND_WEEKS_BY * 2 + 1,
        selectedDate,
        props.isoStartDay
      ),
      selectedDate: selectedDate
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedDate &&
      !this.state.selectedDate.isSame(nextProps.selectedDate, "day")
    ) {
      this._setSelectedDate(
        DateFns.initMoment(nextProps.selectedDate, nextProps.locale)
      );
      this._scrollTo(this.selectedIndex);
    }
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
        onEndReachedThreshold={END_THRESHOLD}
        onLayout={this._onLayout}
        onViewableItemsChanged={this._onViewableItemsChanged}
      />
    );
  }

  /**
   * Pure function to generate an array of objects that can be used by the FlatList.
   *
   * The FlatList renders a 'week' as a new item. This function
   * creates a number of entries equal to the weeks parameter
   * and starting from the fromDate paramater. The fromDate
   * needs to be set to the correct weekday used to start each WeekView
   * by the callee.
   *
   * @param {moment} fromDate
   *  The starting date for the array of weeks to be generated
   * @param {number} weeks
   *  The number of weeks to be generated
   * @param {moment} selectedDate
   *  The date that is current selected
   * @param {number} isoStartDay
   *  The ISOWeekday number that starts the week being displayed (1 - 7)
   * @returns {Array<Object>}
   *
   * @memberof DateSlider
   */
  _generateDates(fromDate, weeks, selectedDate, isoStartDay) {
    const startOfSelectedWeek = DateFns.getStartOfWeek(
      selectedDate,
      isoStartDay
    );

    return _.map(_.range(weeks), i => {
      const weekStartDate = fromDate.clone().add(i, "weeks");
      if (startOfSelectedWeek.isSame(weekStartDate, "day")) {
        this.selectedIndex = i;
      }
      return {
        key: weekStartDate.toISOString(),
        date: weekStartDate,
        arrSelected: this._generateArrSelected(
          weekStartDate,
          startOfSelectedWeek,
          selectedDate,
          isoStartDay
        )
      };
    });
  }

  /**
   * A pure function to generate an array of boolean values
   * that specify if one of the days of the week is selected.
   *
   * This array is to be used as a prop on the WeekView component.
   *
   * @param {moment} weekStartDate
   *  The start date of the week this is to be generated
   * @param {moment} startOfSelectedWeek
   *  The start of the week that contains the selectedDate
   * @param {moment} selectedDate
   *  The date that is selected
   * @param {number} isoStartDay
   *  The ISOWeekday number that starts the week being displayed (1 - 7)
   *
   * @returns {Array<boolean>}
   *
   * @memberof DateSlider
   */
  _generateArrSelected(
    weekStartDate,
    startOfSelectedWeek,
    selectedDate,
    isoStartDay
  ) {
    let result = [false, false, false, false, false, false, false];
    if (weekStartDate && weekStartDate.isSame(startOfSelectedWeek, "day")) {
      result[DateFns.getSelectedDayOfWeek(selectedDate, isoStartDay)] = true;
    }
    return result;
  }

  /**
   * Captures the FlatList instance ref, so that
   * the scrollTo method can be called on it.
   * This is populated from the DateSliderComponent.
   *
   * @param {FlatList} flatlist
   *   The FlatList instance
   *
   * @memberof DateSlider
   */
  _captureFlatListRef = flatlist => (this.flatlist = flatlist);

  /**
   * ReactNative method called by the FlatList
   * This needs to be here as it uses viewWidth held in state
   *
   * @param {Object} data
   * @param {number} index
   *
   * @memberof DateSlider
   */
  _getItemLayout = (data, index) => {
    return {
      length: this.state.viewWidth,
      offset: this.state.viewWidth * index,
      index
    };
  };

  /**
   * ReactNative method called by the view containing the FlatList
   * This needs to be here as handles setting the viewWidth
   * based on what the containing view reports.
   *
   * @param {Object} event
   *  The event generated from the RN onLayout call
   *
   * @memberof DateSlider
   */
  _onLayout = event => {
    const nativeEvent = event.nativeEvent;
    this.setState({ viewWidth: nativeEvent.layout.width });
    if (this.viewableIndex === -1) {
      this._scrollTo(this.selectedIndex);
    } else {
      this._scrollTo(this.viewableIndex);
    }
  };

  /**
   * Scrolls the flatlist to the specified index.
   * This wraps the call in a setTimeout(_,0) Promise
   * to stop issues when the index to be scrolled to has not yet been
   * rendered.
   *
   * @param {number} index
   *  The index to scroll the flatlist to
   *
   * @memberof DateSlider
   */
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
    this.isExpanding = true;
    const lastDate = this.state.arrDates[this.state.arrDates.length - 1].date;
    const appendWeeksFrom = lastDate.clone().add(1, "weeks");
    const arrNewDates = this._generateDates(
      appendWeeksFrom,
      EXTEND_WEEKS_BY,
      this.state.selectedDate,
      this.props.isoStartDay
    );
    this.setState({ arrDates: [...this.state.arrDates, ...arrNewDates] });
    this.isExpanding = false;
  };

  _onStartReached = () => {
    const firstDate = this.state.arrDates[0].date;
    const prependWeeksFrom = firstDate
      .clone()
      .subtract(EXTEND_WEEKS_BY, "weeks");
    const arrNewDates = this._generateDates(
      prependWeeksFrom,
      EXTEND_WEEKS_BY,
      this.state.selectedDate,
      this.props.isoStartDay
    );
    this.setState({ arrDates: [...arrNewDates, ...this.state.arrDates] });
    this.selectedIndex = this.selectedIndex + EXTEND_WEEKS_BY;
    this._scrollTo(END_THRESHOLD - 1 + EXTEND_WEEKS_BY);
    this.isExpanding = false;
  };

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length === 1) {
      const viewableIndex = viewableItems[0].index;
      const changedIndex = changed[0].index;
      this.viewableIndex = viewableIndex;

      if (changedIndex === viewableIndex - 1) {
        // Week forward
        const date = this.state.arrDates[viewableIndex].date;
        this.props.onWeekChanged(date);
      }

      if (changedIndex === viewableIndex + 1) {
        // week back
        const date = this.state.arrDates[viewableIndex].date;
        this.props.onWeekChanged(date);
      }

      if (changedIndex <= END_THRESHOLD && viewableIndex === changedIndex - 1) {
        if (!this.isExpanding) {
          this.isExpanding = true;
          this._onStartReached();
        }
      }
    }
  };

  _onDateSelected = date => {
    this._setSelectedDate(date);
    this.props.onDateSelected(date);
  };

  _setSelectedDate = date => {
    const startOfSelectedWeek = DateFns.getStartOfWeek(
      date,
      this.props.isoStartDay
    );

    let arrDates = [...this.state.arrDates];

    const prevSelectedIndex = this.selectedIndex;

    const selectedIndex = _.findIndex(arrDates, [
      "key",
      startOfSelectedWeek.toISOString()
    ]);

    arrDates[prevSelectedIndex].arrSelected = this._generateArrSelected();
    arrDates[selectedIndex].arrSelected = this._generateArrSelected(
      arrDates[selectedIndex].date,
      startOfSelectedWeek,
      date,
      this.props.isoStartDay
    );

    this.selectedIndex = selectedIndex;

    this.setState({
      arrDates: arrDates,
      selectedDate: date
    });
  };
}

export default DateSlider;
