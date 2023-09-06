const express = require("express");
const router = express();
const {
  verificarSenhaBanco,
  verificarDados,
} = require("../middleware/middleware");
const {
  listarContas,
  criarConta,
  atualizarUsuário,
  deletarConta,
  depositar,
  sacar,
  transferir,
  exibirSaldo,
  extrato,
} = require("../controladores/banco");

router.get("/contas", verificarSenhaBanco, listarContas);
router.post("/contas", verificarDados, criarConta);
router.put("/contas/:numeroConta/usuario", verificarDados, atualizarUsuário);
router.delete("/contas/:numeroConta", deletarConta);
router.post("/transacoes/depositar", depositar);
router.post("/transacoes/sacar", sacar);
router.post("/transacoes/transferir", transferir);
router.get("/contas/saldo", exibirSaldo);
router.get("/contas/extrato", extrato);

module.exports = router;
