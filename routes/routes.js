import { Router } from "../deps.js";
import {
  showLoginForm,
  showRegistrationForm,
  showLogoutForm,
} from "./controllers/authController.js";
import * as authApi from "./apis/authApi.js";
import {
  showReportForm,
  showMorningForm,
  showEveningForm,
} from "./controllers/reportController.js";
import * as reportApi from "./apis/reportApi.js";
import { showSummaryReport } from "./controllers/summaryController.js";
import * as summaryApi from "./apis/summaryApi.js";
import { showLandingPage } from "./controllers/landingController.js";

const router = new Router();
//landing section
router.get("/", showLandingPage);
//auth section
router.get("/auth/registration", showRegistrationForm);
router.post("/auth/registration", authApi.postRegistrationForm);
router.get("/auth/login", showLoginForm);
router.post("/auth/login", authApi.postLoginForm);
router.get("/auth/logout", showLogoutForm);
router.post("/auth/logout", authApi.postLogoutForm);
//report section
router.get("/behavior/reporting", showReportForm);
router.post("/behavior/reporting", reportApi.postReportForm);
router.get("/behavior/reporting/morning", showMorningForm);
router.post("/behavior/reporting/morning", reportApi.postMorningForm);
router.get("/behavior/reporting/evening", showEveningForm);
router.post("/behavior/reporting/evening", reportApi.postEveningForm);
//summary section
router.get("/behavior/summary", showSummaryReport);
router.post("/behavior/summary/cutomized/week", summaryApi.postCustomizedWeeklySummaryReport);
router.post("/behavior/summary/cutomized/month", summaryApi.postCustomizedMonthlySummaryReport);
//api section
router.get("/api/summary", summaryApi.getLatestWeeklySummaryReport);
router.get("/api/summary/:year/:month/:day", summaryApi.getSummaryReportOnGivenDate);
export { router };
