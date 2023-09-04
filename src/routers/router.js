const express = require("express");
const router = express();
const { verificarSenha } = require("../middleware/middleware");
const {
  listarContas,
  criarConta,
  atualizarUsuário,
} = require("../controladores/banco");

router.get("/contas", verificarSenha, listarContas);
router.post("/contas", verificarSenha, criarConta);
router.put("/contas/:id/usuario", verificarSenha, atualizarUsuário);

module.exports = router;
