import moment from "moment";

import DateSlider from "../src/DateSlider";
import DateFns from "../src/DateFns";

const testData = [
  {
    weekStartDate: "2017-05-10",
    selectedDate: "2017-05-21",
    isoStartDay: 1
  },
  {
    weekStartDate: "2017-05-10",
    selectedDate: "2017-05-10",
    isoStartDay: 1
  },
  {
    weekStartDate: "2018-04-13",
    selectedDate: "2018-04-14",
    isoStartDay: 5
  },
  {
    weekStartDate: "1999-02-28",
    selectedDate: "1999-03-12",
    isoStartDay: 3
  },
  {
    weekStartDate: "2010-11-06",
    selectedDate: "2010-10-01",
    isoStartDay: 6
  },
  {
    weekStartDate: "2025-03-01",
    selectedDate: "2010-10-01",
    isoStartDay: 2
  },
  {
    weekStartDate: "2025-03-01",
    selectedDate: "2025-03-12",
    isoStartDay: 5
  },
  {
    weekStartDate: "2017-05-10",
    selectedDate: "2017-05-12",
    isoStartDay: 1
  },
  {
    weekStartDate: "2017-05-10",
    selectedDate: "2017-05-08",
    isoStartDay: 1
  },
  {
    weekStartDate: "2018-04-13",
    selectedDate: "2018-04-09",
    isoStartDay: 5
  },
  {
    weekStartDate: "1999-02-28",
    selectedDate: "1999-03-01",
    isoStartDay: 3
  },
  {
    weekStartDate: "2010-11-06",
    selectedDate: "2010-11-04",
    isoStartDay: 6
  },
  {
    weekStartDate: "2025-03-01",
    selectedDate: "2010-03-02",
    isoStartDay: 2
  },
  {
    weekStartDate: "2025-03-01",
    selectedDate: "2025-02-28",
    isoStartDay: 5
  }
];

describe("DateSlider _generateArrSelected", () => {
  const dateSlider = new DateSlider({});

  testData.forEach(item => {
    it(`should match snapshot when given a week startDate of ${item.weekStartDate} and a selectedDate of ${item.selectedDate} and the isoStartDay is ${item.isoStartDay}`, () => {
      const result = dateSlider._generateArrSelected(
        DateFns.getStartOfWeek(moment(item.weekStartDate), item.isoStartDay),
        DateFns.getStartOfWeek(moment(item.selectedDate), item.isoStartDay),
        moment(item.selectedDate),
        item.isoStartDay
      );
      expect(JSON.stringify(result)).toMatchSnapshot();
    });
  });
});
