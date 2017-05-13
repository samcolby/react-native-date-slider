import moment from "moment";

import DateSlider from "../src/DateSlider";
import DateFns from "../src/DateFns";

const testData = [
  {
    fromDate: "2017-05-10",
    weeks: 4,
    selectedDate: "2017-05-21",
    isoStartDay: 1
  },
  {
    fromDate: "2017-05-10",
    weeks: 4,
    selectedDate: "2017-05-10",
    isoStartDay: 1
  },
  {
    fromDate: "2018-04-13",
    weeks: 3,
    selectedDate: "2018-04-14",
    isoStartDay: 5
  },
  {
    fromDate: "1999-02-28",
    weeks: 4,
    selectedDate: "1999-03-12",
    isoStartDay: 3
  },
  {
    fromDate: "2010-11-06",
    weeks: 8,
    selectedDate: "2010-10-01",
    isoStartDay: 6
  },
  {
    fromDate: "2025-03-01",
    weeks: 3,
    selectedDate: "2010-10-01",
    isoStartDay: 2
  },
  {
    fromDate: "2025-03-01",
    weeks: 4,
    selectedDate: "2025-03-12",
    isoStartDay: 5
  }
];

describe("DateSlider _generateDates", () => {
  const dateSlider = new DateSlider({});

  testData.forEach(item => {
    it(`should match snapshot when given ${item.fromDate} for ${item.weeks} weeks when the selectedDate is ${item.selectedDate} and the isoStartDay is ${item.isoStartDay}`, () => {
      const result = dateSlider._generateDates(
        DateFns.getStartOfWeek(moment(item.fromDate), item.isoStartDay),
        item.weeks,
        moment(item.selectedDate),
        item.isoStartDay
      );
      expect(JSON.stringify(result)).toMatchSnapshot();
    });
  });
});
