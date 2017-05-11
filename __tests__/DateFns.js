import moment from "moment";

import DateFns from "../src/DateFns";

const getStartOfWeekTestData = [
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
  getStartOfWeekTestData.forEach(item => {
    it(`should return ${item.output} when given ${item.input} and iosWeekday is ${item.isoStartDay}`, () => {
      const result = DateFns.getStartOfWeek(
        moment(item.input),
        item.isoStartDay
      );
      expect(result.format("YYYY-MM-DD")).toBe(item.output);
    });
  });
});

const getSelectedDayOfWeekTestData = [
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
  getSelectedDayOfWeekTestData.forEach(item => {
    it(`should return ${item.output} when given ${item.input} and iosWeekday is ${item.isoStartDay}`, () => {
      const result = DateFns.getSelectedDayOfWeek(
        moment(item.input),
        item.isoStartDay
      );
      expect(result).toBe(item.output);
    });
  });
});
