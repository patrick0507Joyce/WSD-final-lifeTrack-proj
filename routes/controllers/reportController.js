import {
  getMorningData,
  getEveningData,
} from "../../services/reportService.js";

const showReportForm = async ({ render }) => {
  render("./reports/selectTimePeriodForm.ejs");
};

const showMorningForm = async ({ render }) => {
  render("./reports/morningForm.ejs", await getMorningData());
};

const showEveningForm = async ({ render }) => {
  render("./reports/eveningForm.ejs", await getEveningData());
};

export { showReportForm, showMorningForm, showEveningForm };
