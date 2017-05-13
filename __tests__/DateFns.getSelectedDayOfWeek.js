import moment from "moment";

import DateFns from "../src/DateFns";

const testData = [
  {
    input: "2017-05-08",
    isoStartDay: 1,
    output: 0
  },
  {
    input: "2017-05-10",
    isoStartDay: 1,
    output: 2
  },
  {
    input: "2017-05-12",
    isoStartDay: 1,
    output: 4
  },
  {
    input: "2017-05-08",
    isoStartDay: 2,
    output: 6
  },
  {
    input: "2017-05-10",
    isoStartDay: 2,
    output: 1
  },
  {
    input: "2017-05-12",
    isoStartDay: 2,
    output: 3
  },
  {
    input: "2017-05-08",
    isoStartDay: 3,
    output: 5
  },
  {
    input: "2017-05-10",
    isoStartDay: 3,
    output: 0
  },
  {
    input: "2017-05-12",
    isoStartDay: 3,
    output: 2
  },
  {
    input: "2017-05-08",
    isoStartDay: 4,
    output: 4
  },
  {
    input: "2017-05-10",
    isoStartDay: 4,
    output: 6
  },
  {
    input: "2017-05-12",
    isoStartDay: 4,
    output: 1
  },
  {
    input: "2017-05-08",
    isoStartDay: 5,
    output: 3
  },
  {
    input: "2017-05-10",
    isoStartDay: 5,
    output: 5
  },
  {
    input: "2017-05-12",
    isoStartDay: 5,
    output: 0
  },
  {
    input: "2017-05-08",
    isoStartDay: 6,
    output: 2
  },
  {
    input: "2017-05-10",
    isoStartDay: 6,
    output: 4
  },
  {
    input: "2017-05-12",
    isoStartDay: 6,
    output: 6
  },
  {
    input: "2017-05-08",
    isoStartDay: 7,
    output: 1
  },
  {
    input: "2017-05-10",
    isoStartDay: 7,
    output: 3
  },
  {
    input: "2017-05-12",
    isoStartDay: 7,
    output: 5
  },
  {
    input: "2017-05-14",
    isoStartDay: 7,
    output: 0
  }
];

describe("DateFns getSelectedDayOfWeek", () => {
  testData.forEach(item => {
    it(`should return ${item.output} when given ${item.input} and iosWeekday is ${item.isoStartDay}`, () => {
      const result = DateFns.getSelectedDayOfWeek(
        moment(item.input),
        item.isoStartDay
      );
      expect(result).toBe(item.output);
    });
  });
});
