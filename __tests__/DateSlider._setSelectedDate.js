import React from "react";

import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import moment from "moment";

import DateFns from "../src/DateFns";
import DateSlider from "../src/DateSlider";

describe("DateSlider _setSelectedDate", () => {
  it("should change the selectedDate", () => {
    const isoStartDay = 4;
    const onDateSelected = jest.fn();
    const onWeekChanged = jest.fn();
    const selectedDate = moment("2017-05-11");
    const component = shallow(
      <DateSlider
        isoStartDay={isoStartDay}
        onDateSelected={onDateSelected}
        onWeekChanged={onWeekChanged}
        selectedDate={selectedDate}
      />
    );

    const newSelectedDate = DateFns.initMoment("2017-02-11");

    component.instance()._setSelectedDate(newSelectedDate);

    expect(component.name()).toBe("DateSliderComponent");
  });
});
