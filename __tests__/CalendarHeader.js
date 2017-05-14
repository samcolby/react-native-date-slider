import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

// import moment from "moment";
import _ from "lodash";

import DateFns from "../src/DateFns";
import CalendarHeader from "../src/CalendarHeader";

describe("CalendarHeader Component", () => {
  it("should render without issues", () => {
    const component = shallow(
      <CalendarHeader
        startingDate={DateFns.initMoment("2017-12-25")}
        calendarHeaderFormat="MMMM YYYY"
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render December 2017", () => {
    const component = shallow(
      <CalendarHeader
        startingDate={DateFns.initMoment("2017-12-25")}
        calendarHeaderFormat="MMMM YYYY"
      />
    );

    expect(component.contains("December 2017")).toBe(true);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render January / February 2018", () => {
    const component = shallow(
      <CalendarHeader
        startingDate={DateFns.initMoment("2018-01-29")}
        calendarHeaderFormat="MMMM YYYY"
      />
    );

    expect(component.contains("January / February 2018")).toBe(true);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render December 2017 / January 2018", () => {
    const component = shallow(
      <CalendarHeader
        startingDate={DateFns.initMoment("2017-12-30")}
        calendarHeaderFormat="MMMM YYYY"
      />
    );

    expect(component.contains("December 2017 / January 2018")).toBe(true);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render Jan / Feb 2018", () => {
    const component = shallow(
      <CalendarHeader
        startingDate={DateFns.initMoment("2018-01-29")}
        calendarHeaderFormat="MMM YYYY"
      />
    );

    expect(component.contains("Jan / Feb 2018")).toBe(true);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render 01 / 02 2018", () => {
    const component = shallow(
      <CalendarHeader
        startingDate={DateFns.initMoment("2018-01-29")}
        calendarHeaderFormat="MM YYYY"
      />
    );

    expect(component.contains("01 / 02 2018")).toBe(true);
    expect(toJson(component)).toMatchSnapshot();
  });

  // TODO: Fix this
  /*it("should render 1 / 2 18", () => {
    const component = shallow(
      <CalendarHeader
        startingDate={DateFns.initMoment("2018-01-29")}
        calendarHeaderFormat="M YYYY"
      />
    );

    expect(component.props().children).toBe("1 / 2 2018");
    expect(toJson(component)).toMatchSnapshot();
  });*/

  it("should render 1st / 2nd 18", () => {
    const component = shallow(
      <CalendarHeader
        startingDate={DateFns.initMoment("2018-01-29")}
        calendarHeaderFormat="Mo YY"
      />
    );

    expect(component.contains("1st / 2nd 18")).toBe(true);
    expect(toJson(component)).toMatchSnapshot();
  });
});
