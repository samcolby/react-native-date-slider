import React from "react";

import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import moment from "moment";

import DateSlider from "../src/DateSlider";

describe("DateSlider Component", () => {
  it("should shallow render without issues", () => {
    const component = shallow(
      <DateSlider selectedDate={moment.utc("2017-05-11")} />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render a DateSliderComponent", () => {
    const isoStartDay = 4;
    const onDateSelected = jest.fn();
    const onWeekChanged = jest.fn();
    const selectedDate = moment();
    const component = shallow(
      <DateSlider
        isoStartDay={isoStartDay}
        onDateSelected={onDateSelected}
        onWeekChanged={onWeekChanged}
        selectedDate={selectedDate}
      />
    );

    expect(component.name()).toBe("DateSliderComponent");
  });
});
