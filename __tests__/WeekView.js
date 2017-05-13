import React from "react";

import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import _ from "lodash";
import moment from "moment";

import DateFns from "../src/DateFns";
import WeekView from "../src/WeekView";

describe("WeekView Component", () => {
  it("should shallow render without issues", () => {
    const startingDate = DateFns.getStartOfWeek(moment.utc("2017-06-18"));
    const arrSelected = [false, true, false, false, false, false, false];
    const onDateSelected = jest.fn();
    const component = shallow(
      <WeekView
        startingDate={startingDate}
        arrSelected={arrSelected}
        onDateSelected={onDateSelected}
        viewWidth={750}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render 7 CalendarDays", () => {
    const startingDate = DateFns.getStartOfWeek(moment.utc("2017-06-18"));
    const arrSelected = [false, true, false, false, false, false, false];
    const onDateSelected = jest.fn();
    const component = shallow(
      <WeekView
        startingDate={startingDate}
        arrSelected={arrSelected}
        onDateSelected={onDateSelected}
        viewWidth={750}
      />
    );

    expect(component.find("CalendarDay").length).toBe(7);
  });

  it("should render the correct dates", () => {
    const startingDate = DateFns.getStartOfWeek(moment.utc("2017-06-18"));
    const arrSelected = [false, false, false, false, false, false, false];
    const onDateSelected = jest.fn();
    const component = shallow(
      <WeekView
        startingDate={startingDate}
        arrSelected={arrSelected}
        onDateSelected={onDateSelected}
        viewWidth={750}
      />
    );

    expect(component.find("CalendarDay").length).toBe(7);
    component.find("CalendarDay").forEach((child, j) => {
      const date = startingDate.clone().add(j, "days");
      expect(child.props().date.toISOString()).toBe(date.toISOString());
    });
  });

  _.range(7).forEach(i => {
    it(`should set the correct selectedDate for day ${i + 1}`, () => {
      const startingDate = DateFns.getStartOfWeek(moment.utc("2017-06-18"));
      const arrSelected = [false, false, false, false, false, false, false];
      arrSelected[i] = true;
      const onDateSelected = jest.fn();
      const component = shallow(
        <WeekView
          startingDate={startingDate}
          arrSelected={arrSelected}
          onDateSelected={onDateSelected}
          viewWidth={750}
        />
      );

      expect(component.find("CalendarDay").length).toBe(7);
      component.find("CalendarDay").forEach((child, j) => {
        if (i == j) {
          expect(child.props().selected).toBe(true);
        } else {
          expect(child.props().selected).toBe(false);
        }
      });
    });
  });

  it("should not rerender if the props are the same", () => {
    const startingDate = DateFns.getStartOfWeek(moment.utc("2017-06-18"));
    const arrSelected = [false, false, false, false, false, false, false];
    const onDateSelected = jest.fn();
    const component = shallow(
      <WeekView
        startingDate={startingDate}
        arrSelected={arrSelected}
        onDateSelected={onDateSelected}
        viewWidth={750}
      />
    );

    const firstRender = toJson(component);

    component.setProps({
      startingDate,
      arrSelected,
      onDateSelected,
      viewWidth: 750
    });
    expect(toJson(component)).toEqual(firstRender);
  });

  it("should update if the selected date changes", () => {
    const startingDate = DateFns.getStartOfWeek(moment.utc("2017-06-18"));
    const arrSelected = [true, false, false, false, false, false, false];
    const onDateSelected = jest.fn();
    const component = shallow(
      <WeekView
        startingDate={startingDate}
        arrSelected={arrSelected}
        onDateSelected={onDateSelected}
        viewWidth={750}
      />
    );

    const firstRender = toJson(component);
    arrSelected[0] = false;
    arrSelected[2] = true;

    component.setProps({
      startingDate: startingDate,
      arrSelected: [...arrSelected],
      onDateSelected: onDateSelected,
      viewWidth: 750
    });

    const secondRender = toJson(component);

    expect(secondRender).toMatchSnapshot();
    expect(secondRender).not.toEqual(firstRender);

    component.find("CalendarDay").forEach((child, j) => {
      if (j === 2) {
        expect(child.props().selected).toBe(true);
      } else {
        expect(child.props().selected).toBe(false);
      }
    });
  });

  it("should rerender if the starting date changes", () => {
    const startingDate = DateFns.getStartOfWeek(moment.utc("2017-06-18"));
    const arrSelected = [true, false, false, false, false, false, false];
    const onDateSelected = jest.fn();
    const component = shallow(
      <WeekView
        startingDate={startingDate}
        arrSelected={arrSelected}
        onDateSelected={onDateSelected}
        viewWidth={750}
      />
    );

    const firstRender = toJson(component);

    const newStartingDate = DateFns.getStartOfWeek(moment.utc("2015-06-18"));
    component.setProps({
      startingDate: newStartingDate,
      arrSelected: arrSelected,
      onDateSelected: onDateSelected,
      viewWidth: 750
    });

    const secondRender = toJson(component);

    expect(secondRender).toMatchSnapshot();
    expect(secondRender).not.toEqual(firstRender);

    component.find("CalendarDay").forEach((child, j) => {
      const date = newStartingDate.clone().add(j, "days");
      expect(child.props().date.toISOString()).toBe(date.toISOString());
    });
  });
});
