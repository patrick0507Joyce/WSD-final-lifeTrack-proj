import { validate } from "../../deps.js";
import {
  validationRulesForMorning,
  validationRulesForEvening,
} from "../../validations/validationRules.js";

import {
  getMorningData,
  getEveningData,
  setMorningReport,
  setEveningReport,
} from "../../services/reportService.js";

const postReportForm = async ({ request, render }) => {
  const body = request.body();
  const params = await body.value;

  const timePeriod = params.get("timePeriod");
  if (timePeriod == "morning") {
    render("./reports/morningForm.ejs", await getMorningData());
  } else {
    render("./reports/eveningForm.ejs", await getEveningData());
  }
};

const postMorningForm = async ({ request, render, session }) => {
  const data = await getMorningData(request);
  const [passes, errors] = await validate(data, validationRulesForMorning);
  if (!passes) {
    data.errors = errors;
    render("./reports/morningForm.ejs", data);
  } else {
    setMorningReport({ session }, data);
    render("./reports/morningForm.ejs", await getMorningData());
  }
};

const postEveningForm = async ({ request, render, session }) => {
  const data = await getEveningData(request);
  const [passes, errors] = await validate(data, validationRulesForEvening);
  if (!passes) {
    data.errors = errors;
    render("./reports/eveningForm.ejs", data);
  } else {
    setEveningReport({ session }, data);
    render("./reports/eveningForm.ejs", await getEveningData());
  }
};

export { postReportForm, postMorningForm, postEveningForm };
