import { executeQuery } from "../../database/database.js";
import { bcrypt } from "../../deps.js";
import { getExistingUsers, setUser } from "../../services/authService.js";

const postRegistrationForm = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");
  const verification = params.get("verification");

  if (password !== verification) {
    response.body = "The entered passwords did not match";
    return;
  }

  const existingUsers = await getExistingUsers(email);
  if (existingUsers.rowCount > 0) {
    response.body = "The email is already reserved.";
    return;
  }

  if (password.length < 4) {
    response.body = "The password is too short(at least 4 characters).";
    return;
  }

  const hash = await bcrypt.hash(password);
  await setUser(email, hash);
  response.body = "Registration successful!";
  response.redirect("/auth/login");
};

const postLoginForm = async ({ request, response, session }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");

  // check if the email exists in the database
  const res = await getExistingUsers(email);

  if (res.rowCount === 0) {
    response.status = 401;
    return;
  }

  // take the first row from the results
  const userObj = res.rowsOfObjects()[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    respnse.status = 401;
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
