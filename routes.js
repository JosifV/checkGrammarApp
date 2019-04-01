const controls = require("./controls");

module.exports = app => {
  app.post("/login/:username/:password", controls.login);

  app.post("/query/:newQuery/:id", controls.query);

  app.get("/querylist/:id", controls.querylist);
};
