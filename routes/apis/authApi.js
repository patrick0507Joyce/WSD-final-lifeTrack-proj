import { executeQuery } from "../../database/database.js";
import { bcrypt } from "../../deps.js";
import { getExistingUsers, setUser } from "../../services/authService.js";

const postRegistrationForm = async ({ request, response, render }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");
  const verification = params.get("verification");

  if (password !== verification) {
    render("./auth/registration.ejs", {
      error: "The entered passwords did not match.",
    });
    return;
  }

  const existingUsers = await getExistingUsers(email);
  if (existingUsers.rowCount > 0) {
    render("./auth/registration.ejs", {
      error: "The email is already reserved.",
    });
    return;
  }

  if (password.length < 4) {
    render("./auth/registration.ejs", {
      error: "The password is too short(at least 4 characters",
    });
    return;
  }

  const hash = await bcrypt.hash(password);
  await setUser(email, hash);
  response.body = "Registration successful!";
  response.redirect("/auth/login");
};

const postLoginForm = async ({ request, response, session, render }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");

  // check if the email exists in the database
  const res = await getExistingUsers(email);
  if (!res) {
    render("./auth/login.ejs", { error: "the user email is not existed!" });
    return;
  }

  // take the first row from the results
  const userObj = res.rowsOfObjects()[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    render("./auth/login.ejs", { error: "Invalid email or password" });
    return;
  }

  await session.set("authenticated", true);
  await session.set("user", {
    id: userObj.id,
    email: userObj.email,
  });
  response.body = "Authentication successful!";
  response.redirect("/");
};

const postLogoutForm = async ({ request, response, session }) => {
  const body = request.body();
  const params = await body.value;

  await session.set("authenticated", null);
  await session.set("user", null);

  response.redirect("/");
};

export { postRegistrationForm, postLoginForm, postLogoutForm };
