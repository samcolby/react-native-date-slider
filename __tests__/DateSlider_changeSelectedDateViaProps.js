import React from "react";

import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import moment from "moment";

import DateSlider from "../src/DateSlider";

const testData = [
  {
    firstDate: "2017-05-10",
    secondDate: "2017-05-21"
  },
  {
    firstDate: "2017-05-10",
    secondDate: "2017-05-11"
  },
  {
    firstDate: "2017-04-10",
    secondDate: "2017-05-11"
  },
  {
    firstDate: "2017-02-10",
    secondDate: "2017-05-11"
  },
  {
    firstDate: "2016-02-10",
    secondDate: "2017-05-11"
  },
  {
    firstDate: "2000-02-10",
    secondDate: "2057-05-11"
  }
];

describe("DateSlider Component", () => {
  testData.forEach(item => {
    it(`should change the selectedDate from ${item.firstDate} to ${item.secondDate}`, () => {
      const selectedDate = moment.utc(item.firstDate);
      const component = shallow(<DateSlider selectedDate={selectedDate} />);

      const firstRender = toJson(component);

      expect(firstRender).toMatchSnapshot();

      component.setProps({
        selectedDate: moment.utc(item.secondDate)
      });

      const secondRender = toJson(component);
      expect(firstRender !== secondRender).toBe(true);

      expect(secondRender).toMatchSnapshot();
    });
  });
});
