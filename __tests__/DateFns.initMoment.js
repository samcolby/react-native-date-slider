import moment from "moment";

import DateFns from "../src/DateFns";

const testData = [
  {
    input: "2017-05-10",
    locale: undefined,
    output: "2017-05-09T00:00:00.000Z"
  },
  {
    input: "2017-01-16",
    locale: { name: "fr" },
    output: "2017-01-16T00:00:00.000Z"
  },
  {
    input: "2017-05-08",
    locale: { name: "uk" },
    output: "2017-05-07T00:00:00.000Z"
  },
  {
    input: "2017-05-11",
    locale: { name: "br" },
    output: "2017-05-10T00:00:00.000Z"
  }
];

describe("DateFns initMoment", () => {
  testData.forEach(item => {
    it(`should return ${item.output} when given ${item.input} and locale is ${JSON.stringify(item.locale)}`, () => {
      const locale = item.locale
        ? item.locale.name ? item.locale.name : "en"
        : "en";
      const result = DateFns.initMoment(moment(item.input).utc(), item.locale);
      expect(result.toISOString()).toBe(item.output);
      expect(result.locale()).toBe(locale);
    });
  });
});
