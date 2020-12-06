import { executeQuery } from "../database/database.js";

const getMorningData = async (request) => {
  const data = {
    date: "",
    sleepDuration: "",
    sleepQuality: "",
    sleepMood: "",
    errors: null,
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.date = params.has("date") ? params.get("date") : "";
    data.sleepDuration = params.has("sleepDuration")
      ? Number(params.get("sleepDuration"))
      : "";
    data.sleepQuality = params.has("sleepQuality")
      ? Number(params.get("sleepQuality"))
      : "";
    data.sleepMood = params.has("sleepMood")
      ? Number(params.get("sleepMood"))
      : "";
  }

  return data;
};

const getEveningData = async (request) => {
  const data = {
    date: "",
    exerciseDuration: "",
    studyDuration: "",
    eatingQuality: "",
    generalMood: "",
    errors: null,
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.date = params.has("date") ? params.get("date") : "";
    data.exerciseDuration = params.has("exerciseDuration")
      ? Number(params.get("exerciseDuration"))
      : "";
    data.studyDuration = params.has("studyDuration")
      ? Number(params.get("studyDuration"))
      : "";
    data.eatingQuality = params.has("eatingQuality")
      ? Number(params.get("eatingQuality"))
      : "";
    data.generalMood = params.has("generalMood")
      ? Number(params.get("generalMood"))
      : "";
  }

  return data;
};

const setMorningReport = async ({ session }, data) => {
  const userId = (await session.get("user")).id;

  const res = await executeQuery(
    "SELECT * FROM morning_report WHERE user_id = $1 and report_date = $2",
    userId,
    data.date
  );
  if (res && res.rowCount > 0) {
    await executeQuery("DELETE from morning_report where user_id = $1", userId);
  }

  await executeQuery(
    "INSERT INTO morning_report (report_date, sleep_duration, sleep_quality, sleep_mood, user_id) VALUES ($1, $2, $3, $4, $5);",
    data.date,
    data.sleepDuration,
    data.sleepQuality,
    data.sleepMood,
    userId
  );
};

const setEveningReport = async ({ session }, data) => {
  const userId = (await session.get("user")).id;

  const res = await executeQuery(
    "SELECT * FROM evening_report WHERE user_id = $1 and report_date = $2",
    userId,
    data.date
  );
  if (res && res.rowCount > 0) {
    await executeQuery("DELETE from evening_report where user_id = $1", userId);
  }

  await executeQuery(
    "INSERT INTO evening_report (report_date, exercise_duration, study_duration, eat_quality, general_mood, user_id) VALUES ($1, $2, $3, $4, $5, $6);",
    data.date,
    data.exerciseDuration,
    data.studyDuration,
    data.eatingQuality,
    data.generalMood,
    userId
  );
};

export { getMorningData, getEveningData, setMorningReport, setEveningReport };
