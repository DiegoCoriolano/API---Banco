const express = require("express");
const router = express();
const { verificarSenha, verificarDados } = require("../middleware/middleware");
const {
  listarContas,
  criarConta,
  atualizarUsuário,
  deletarConta,
  depositar,
  sacar,
  transferir,
  exibirSaldo,
} = require("../controladores/banco");

router.get("/contas", verificarSenha, listarContas);
router.post("/contas", verificarSenha, verificarDados, criarConta);
router.put(
  "/contas/:id/usuario",
  verificarSenha,
  verificarDados,
  atualizarUsuário
);
router.delete("/contas/:numeroConta", verificarSenha, deletarConta);
router.post("/transacoes/depositar", verificarSenha, depositar);
router.post("/transacoes/sacar", verificarSenha, sacar);
router.post("/transacoes/transferir", verificarSenha, transferir);
router.get("/contas/saldo", verificarSenha, exibirSaldo);

module.exports = router;
