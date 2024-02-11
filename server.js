const cors = require("cors");
const express = require("express");
const next = require("next");

const routes = require("./routes");

const { NODE_ENV = "development" } = process.env;

const app = next({ dev: NODE_ENV === "development" });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const application = express();
  application
    .use(cors())
    .use(handler)
    .listen(3001, () => {});
});
