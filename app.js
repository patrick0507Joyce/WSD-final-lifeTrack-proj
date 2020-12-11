import { Application } from "./deps.js";
import { Session } from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from "./middlewares/middlewares.js";
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import { parse } from "./deps.js";

const app = new Application();

const session = new Session({ framework: "oak" });
await session.init();
app.use(session.use()(session));

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
  })
);

app.use(middleware.errorMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.serveStaticFilesMiddleware);
app.use(middleware.limitAccessMiddleware);

app.use(router.routes());

const DEFAULT_PORT = 7777;
const argPort = parse(Deno.args).port;

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
}

export default app;
