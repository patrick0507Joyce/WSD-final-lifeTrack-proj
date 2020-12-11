const showRegistrationForm = async ({ render }) => {
  render("./auth/registration.ejs", { error:null });
};

const showLoginForm = async ({ render }) => {
  render("./auth/login.ejs", { error: null });
};

const showLogoutForm = async ({ render, response, session }) => {
  let authenticated = await session.get("authenticated");
  if (authenticated) {
    render("./auth/logout.ejs");
  } else {
    response.body = "Please Login in first!";
  }
}

export { showRegistrationForm, showLoginForm, showLogoutForm };
