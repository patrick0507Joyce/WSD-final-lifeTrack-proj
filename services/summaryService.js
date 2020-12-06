import { executeQuery } from "../database/database.js";

const getDatesBefore = (count, startDate) => {
  if (count == null || startDate == null) {
    return;
  }

  startDate.setDate(startDate.getDate() - count);
  startDate = new Date(startDate).toISOString().slice(0, 10);

  return startDate;
};

const getAverageSummaryDuringPeriod = async (
  startDateStandard,
  endDateStandard
) => {

  const data = {
    sleep_duration_average: "",
    sleep_quality_average: "",
    exercise_duration_average: "",
    study_duration_average: "",
    general_mood_average: "",
  };

  const resWeeklyMorningSummary = await executeQuery(
    "SELECT AVG(sleep_duration) AS sleep_duration_average, AVG(sleep_quality) AS sleep_quality_average FROM morning_report WHERE report_date >= $1 AND report_date <= $2 GROUP BY user_id",
    startDateStandard,
    endDateStandard
  );

  const resWeeklyEveningSummary = await executeQuery(
    "SELECT AVG(exercise_duration) AS exercise_duration_average, AVG(study_duration) AS study_duration_average, AVG(general_mood) AS general_mood_average FROM evening_report WHERE report_date >= $1 AND report_date <= $2 GROUP BY user_id",
    startDateStandard,
    endDateStandard
  );

  if (resWeeklyMorningSummary && resWeeklyMorningSummary.rowCount > 0) {
    let weeklyMorningSummary = resWeeklyMorningSummary.rowsOfObjects()[0];
    data.sleep_duration_average = Number(
      weeklyMorningSummary.sleep_duration_average
    ).toFixed(2);
    data.sleep_quality_average = Number(
      weeklyMorningSummary.sleep_quality_average
    ).toFixed(2);
  }

  if (resWeeklyEveningSummary && resWeeklyEveningSummary.rowCount > 0) {
    let weeklyEveningSummary = resWeeklyEveningSummary.rowsOfObjects()[0];
    data.exercise_duration_average = Number(
      weeklyEveningSummary.exercise_duration_average
    ).toFixed(2);
    data.study_duration_average = Number(
      weeklyEveningSummary.study_duration_average
    ).toFixed(2);
    data.general_mood_average = Number(
      weeklyEveningSummary.general_mood_average
    ).toFixed(2);
  }
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] == "") {
        return null;
      }
    }
  }
  return data;
};

const getAverageWeeklySummary = async (startDateStandard, endDateStandard) => {

  const today = endDateStandard
    ? endDateStandard
    : getDatesBefore(0, new Date());
  const oneWeekBefore = startDateStandard
    ? startDateStandard
    : getDatesBefore(6, new Date());

  return await getAverageSummaryDuringPeriod(oneWeekBefore, today);
};

const getAverageMonthlySummary = async (startDateStandard, endDateStandard) => {

  const today = endDateStandard
    ? endDateStandard
    : getDatesBefore(0, new Date());
  const oneMonthBefore = startDateStandard
    ? startDateStandard
    : getDatesBefore(30, new Date());

  return await getAverageSummaryDuringPeriod(oneMonthBefore, today);
};

const getLandingMoodData = async () => {
  const data = {
    mood_today: "",
    mood_yesterday: "",
  };
  const today = getDatesBefore(0, new Date());
  const yesterday = getDatesBefore(1, new Date());

  const moodToday = await executeQuery(
    "SELECT user_id, AVG(sleep_mood) FROM ( SELECT user_id, sleep_mood FROM morning_report WHERE report_date = $1 GROUP BY user_id, sleep_mood UNION ALL SELECT user_id, general_mood FROM evening_report WHERE report_date = $2 GROUP BY user_id, general_mood) AS subquery GROUP BY user_id",
    today,
    today
  );

  const moodYesterday = await executeQuery(
    "SELECT user_id, AVG(sleep_mood) FROM ( SELECT user_id, sleep_mood FROM morning_report WHERE report_date = $1 GROUP BY user_id, sleep_mood UNION ALL SELECT user_id, general_mood FROM evening_report WHERE report_date = $2 GROUP BY user_id, general_mood) AS subquery GROUP BY user_id",
    yesterday,
    yesterday
  );

  if (
    !moodToday ||
    !moodYesterday ||
    moodToday.rowCount == 0 ||
    moodYesterday.rowCount == 0
  ) {
    return null;
  }
  data.mood_today = Number(moodToday.rowsOfObjects()[0].avg).toFixed(2);
  data.mood_yesterday = Number(
    moodYesterday.rowsOfObjects()[0].avg
  ).toFixed(2);
  
  return data;
};

export {
  getDatesBefore,
  getAverageWeeklySummary,
  getAverageMonthlySummary,
  getLandingMoodData,
  getAverageSummaryDuringPeriod
};
