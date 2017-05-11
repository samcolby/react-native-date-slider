import moment from "moment";

import DateFns from "../src/DateFns";

const doTest = (input, isoStartDay, output) => {
  const result = DateFns.getStartOfWeek(moment(input), isoStartDay);
  expect(result.format("YYYY-MM-DD")).toBe(output);
};

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
  }
];

describe("DateFns getStartOfWeek", () => {
  testData.forEach(item => {
    it(`should return ${item.output} when given ${item.input} and iosWeekday is ${item.isoStartDay}`, () => {
      doTest(item.input, item.isoStartDay, item.output);
    });
  });
});
