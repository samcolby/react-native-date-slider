import moment from "moment";

import DateFns from "../src/DateFns";

const testData = [
  {
    input: "2017-05-10",
    isoStartDay: 1,
    output: "2017-05-08"
  },
  {
    input: "2017-05-10",
    isoStartDay: 2,
    output: "2017-05-09"
  },
  {
    input: "2017-05-08",
    isoStartDay: 2,
    output: "2017-05-02"
  },
  {
    input: "2017-05-08",
    isoStartDay: 3,
    output: "2017-05-03"
  },
  {
    input: "2017-05-11",
    isoStartDay: 4,
    output: "2017-05-11"
  },
  {
    input: "2017-05-12",
    isoStartDay: 4,
    output: "2017-05-11"
  },
  {
    input: "2017-05-08",
    isoStartDay: 4,
    output: "2017-05-04"
  },
  {
    input: "2017-05-12",
    isoStartDay: 5,
    output: "2017-05-12"
  },
  {
    input: "2017-05-13",
    isoStartDay: 5,
    output: "2017-05-12"
  },
  {
    input: "2017-05-08",
    isoStartDay: 5,
    output: "2017-05-05"
  },
  {
    input: "2017-05-13",
    isoStartDay: 6,
    output: "2017-05-13"
  },
  {
    input: "2017-05-14",
    isoStartDay: 6,
    output: "2017-05-13"
  },
  {
    input: "2017-05-08",
    isoStartDay: 6,
    output: "2017-05-06"
  },
  {
    input: "2017-05-14",
    isoStartDay: 7,
    output: "2017-05-14"
  },
  {
    input: "2017-05-15",
    isoStartDay: 7,
    output: "2017-05-14"
  },
  {
    input: "2017-05-08",
    isoStartDay: 7,
    output: "2017-05-07"
  }
];

describe("DateFns getStartOfWeek", () => {
  testData.forEach(item => {
    it(`should return ${item.output} when given ${item.input} and iosWeekday is ${item.isoStartDay}`, () => {
      const result = DateFns.getStartOfWeek(
        moment(item.input),
        item.isoStartDay
      );
      expect(result.format("YYYY-MM-DD")).toBe(item.output);
    });
  });
});
