const showRegistrationForm = async ({ render }) => {
  render("./auth/registration.ejs");
};

const showLoginForm = async ({ render }) => {
  render("./auth/login.ejs");
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
