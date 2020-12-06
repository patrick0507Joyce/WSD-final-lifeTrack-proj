import {
  getDatesBefore,
  getAverageWeeklySummary,
  getAverageMonthlySummary,
  getAverageSummaryDuringPeriod
} from "../../services/summaryService.js";

const data = {
    weekly_summary: null,
    monthly_summary: null,
};

const getDateOfISOWeek = (w, y) => {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
};

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const postCustomizedWeeklySummaryReport = async ({ request, render }) => {
  const body = request.body();
  const params = await body.value;

  const customizedWeek = params.get("week");
  const yearNum = customizedWeek.slice(0, 4);
  const weekNum = customizedWeek.slice(6, 8);

  let startDate = getDateOfISOWeek(weekNum, yearNum);
  const startDateStandard = startDate.toISOString().slice(0, 10);
  let endDateStandard = startDate;
  endDateStandard = getDatesBefore(-6, endDateStandard);

  data.weekly_summary = await getAverageWeeklySummary(
    startDateStandard,
    endDateStandard
  );
  
  if (!data.monthly_summary) {
      data.monthly_summary = await getAverageMonthlySummary();
  }

  render("./summary/summary.ejs", data);
};

const postCustomizedMonthlySummaryReport = async ({ request, render }) => {
  const body = request.body();
  const params = await body.value;

  const customizedMonth = params.get("month");
  const yearNum = customizedMonth.slice(0, 4);
  const monthNum = customizedMonth.slice(5, 7);
  let endDate = new Date(yearNum, monthNum, 1);
  const endDateStandard = endDate.toISOString().slice(0, 10);
  let startDateStandard = endDate;
  const dateCountInThisMonth = daysInMonth(Number(monthNum), Number(yearNum));
  startDateStandard = getDatesBefore(dateCountInThisMonth - 1, endDate);

  data.monthly_summary = await getAverageMonthlySummary(
    startDateStandard,
    endDateStandard
  );

  if (!data.weekly_summary) {
    data.weekly_summary = await getAverageWeeklySummary();
}

  render("./summary/summary.ejs", data);
};

const getLatestWeeklySummaryReport = async ({response }) => {
  const weeklySummary = await getAverageWeeklySummary();
  response.body = weeklySummary;
}

const getSummaryReportOnGivenDate = async ({ params, request, response }) => {
  if (!params.year || !params.month || !params.day || isNaN(params.year) || isNaN(params.month) || isNaN(params.day)) {
    response.status = 401;
  } else {
    const yearNum = Number(params.year);
    const monthNum = Number(params.month);
    const dayNum = Number(params.day);

    const givenDate = new Date(yearNum, monthNum - 1, dayNum + 1).toISOString().slice(0, 10);
    const giveDateSummary = await getAverageSummaryDuringPeriod(givenDate, givenDate);
    console.log("giveDateSummary", givenDate);
    if (!giveDateSummary) {
      response.body = {message: "data not found on given date"};
    } else {
      response.body = giveDateSummary;
    }
  }
}


export {
  postCustomizedWeeklySummaryReport,
  postCustomizedMonthlySummaryReport,
  getLatestWeeklySummaryReport,
  getSummaryReportOnGivenDate
};
