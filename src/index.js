const express = require("express");
const app = express();
const router = require("./routers/router");

app.use(router);

app.listen(3000, () => {
  console.log("Servidor iniciado");
});
