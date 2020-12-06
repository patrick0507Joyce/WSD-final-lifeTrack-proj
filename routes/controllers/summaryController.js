import {
  getAverageWeeklySummary,
  getAverageMonthlySummary,
} from "../../services/summaryService.js";



const showSummaryReport = async ({ render }) => {

  const data = {
    weekly_summary: null,
    monthly_summary: null,
  };
  
  data.weekly_summary = await getAverageWeeklySummary();
  data.monthly_summary = await getAverageMonthlySummary();

  render("./summary/summary.ejs", data);
};

export { showSummaryReport };
