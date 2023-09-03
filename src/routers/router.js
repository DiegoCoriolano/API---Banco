const express = require("express");
const router = express();
const { verificarSenha } = require("../middleware/middleware");
const { listarContas } = require("../controladores/banco");

router.get("/contas", verificarSenha, listarContas);
router.post("/contas", verificarSenha, listarContas);

module.exports = router;
