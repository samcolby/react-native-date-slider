import React from "react";

import { shallow } from "enzyme";

import _ from "lodash";
import moment from "moment";

import DateFns from "../src/DateFns";
import DateSlider from "../src/DateSlider";

const getSelectedDate = component => {
  const [week] = component.props().arrDates.filter(item => {
    return _.some(item.arrSelected);
  });

  const isoDay = _.indexOf(week.arrSelected, true);
  return week.date.clone().add(isoDay, "days");
};

const doTest = (startDate, newDate, isoStartDay = 1) => {
  const onDateSelected = jest.fn();
  const onWeekChanged = jest.fn();
  const selectedDate = moment(startDate);

  const component = shallow(
    <DateSlider
      isoStartDay={isoStartDay}
      onDateSelected={onDateSelected}
      onWeekChanged={onWeekChanged}
      selectedDate={selectedDate}
    />
  );

  expect(getSelectedDate(component).valueOf()).toBe(selectedDate.valueOf());

  const newSelectedDate = DateFns.initMoment(newDate);
  component.instance()._setSelectedDate(newSelectedDate);

  expect(getSelectedDate(component).valueOf()).toBe(newSelectedDate.valueOf());
};

describe("DateSlider _setSelectedDate", () => {
  it("should change the selectedDate to the next day", () => {
    doTest("2017-05-11", "2017-05-12", 4);
  });

  it("should change the selectedDate within the same week", () => {
    doTest("2017-05-11", "2017-05-14", 4);
  });

  it("should change the selectedDate to the following week", () => {
    doTest("2017-05-11", "2017-05-18", 1);
  });

  it("should change the selectedDate to the previous week", () => {
    doTest("2017-05-11", "2017-05-04", 1);
  });

  it("should change the selectedDate to the following month", () => {
    doTest("2017-05-11", "2017-06-11", 1);
  });

  it("should change the selectedDate to the previous month", () => {
    doTest("2017-05-11", "2017-04-11", 1);
  });

  // TODO: Get these to work by changing array dates
  // it("should change the selectedDate to the following year", () => {
  //   doTest("2017-05-11", "2018-05-11", 1);
  // });

  // it("should change the selectedDate to the previous year", () => {
  //   doTest("2017-05-11", "2015-05-11", 1);
  // });
});
