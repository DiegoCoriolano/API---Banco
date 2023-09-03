const express = require("express");
const router = express();
const { verificarSenha } = require("../middleware/middleware");
const { listarContas, criarConta } = require("../controladores/banco");

router.get("/contas", verificarSenha, listarContas);
router.post("/contas", verificarSenha, criarConta);

module.exports = router;
