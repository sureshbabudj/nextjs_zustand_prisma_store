const nextRoutes = require("next-routes");

const routesConfig = nextRoutes().add({
  name: "Homepage",
  pattern: "/home",
  page: "index",
});

module.exports = routesConfig;
