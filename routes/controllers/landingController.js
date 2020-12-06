import { getLandingMoodData } from "../../services/summaryService.js";

const showLandingPage = async ({ render, session }) => {
  const data = {
    mood_today: "",
    mood_yesterday: "",
    user_email: ""
  };
  const moodInfo = await getLandingMoodData();

  if (moodInfo) {
    data.mood_today = moodInfo.mood_today;
    data.mood_yesterday = moodInfo.mood_yesterday;
  }
  
  let isAuthenticated = await session.get("authenticated");
  
  if (isAuthenticated) {
    const userInfo = JSON.stringify(await session.get("user"));
    data.user_email = JSON.parse(userInfo).email; 
  }
  render("./index.ejs", data);

};

export { showLandingPage };
