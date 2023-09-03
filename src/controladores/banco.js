const { contas } = require("../bancodedados");

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

  if (!cpf) {
    return res.status(400).json({ Mensagem: "O campo cpf é obrigatório." });
  }

  if (!data_nascimento) {
    return res
      .status(400)
      .json({ Mensagem: "O campo data_nascimento é obrigatório." });
  }

  if (!telefone) {
    return res
      .status(400)
      .json({ Mensagem: "O campo telefone é obrigatório." });
  }

  if (!email) {
    return res.status(400).json({ Mensagem: "O campo email é obrigatório." });
  }

  if (!senha) {
    return res.status(400).json({ Mensagem: "O campo senha é obrigatório." });
  }

  const verificaCPF = contas.find((conta) => {
    return conta.cpf === cpf;
  });

  const verificaEmail = contas.find((conta) => {
    return conta.email === email;
  });

  if (verificaCPF) {
    return res.status(400).json({ Mensagem: "Este CPF já está cadastrado." });
  }

  if (verificaEmail) {
    return res.status(400).json({ Mensagem: "Este email já está cadastrado." });
  }

  let contadorID = contas.length === 0 ? 0 : contas[contas.length - 1].id + 1;

  contas.push({
    id: contadorID,
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha,
    saldo: 0,
  });

  return res.status(201).json();
};

module.exports = { listarContas, criarConta };
