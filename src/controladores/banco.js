const { banco, contas } = require("../bancodedados");

const listarContas = (req, res) => {
  if (contas.length === 0) {
    return res.status(204).json(contas);
  }
  return res.status(200).json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({ Mensagem: "O campo nome é obrigatório." });
  }
};

module.exports = { listarContas };
