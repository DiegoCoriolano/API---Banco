const { contas } = require("../bancodedados");

function verificarDados(req, res) {
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
}

const listarContas = (req, res) => {
  if (contas.length === 0) {
    return res.status(204).json(contas);
  }
  return res.status(200).json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  verificarDados(req, res);

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

  let contadorID = contas.length === 0 ? 1 : contas[contas.length].id + 1;

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

const atualizarUsuário = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  verificarDados(req, res);

  const { id } = req.params;
  const verificaID = contas.find((conta) => {
    return conta.id === Number(id);
  });

  if (!verificaID || isNaN(id)) {
    return res
      .status(400)
      .json({
        Mensagem: "Esta conta não existe ou o ID é inválido. Insira outro ID.",
      });
  }

  const verificaCPFOutrasContas = contas
    .filter((outrasContas) => {
      return outrasContas.id !== Number(id);
    })
    .find((conta) => {
      return conta.cpf === cpf;
    });

  const verificaEmailOutrasContas = contas
    .filter((outrasContas) => {
      return outrasContas.id !== Number(id);
    })
    .find((conta) => {
      return conta.email === email;
    });

  if (verificaCPFOutrasContas) {
    return res
      .status(400)
      .json({ Mensagem: "Este CPF já está cadastrado em outra conta." });
  }

  if (verificaEmailOutrasContas) {
    return res
      .status(400)
      .json({ Mensagem: "Este email já está cadastrado em outra conta." });
  }

  const contaDoUsuario = contas.find((conta) => {
    return conta.id === Number(id);
  });

  contaDoUsuario.nome = nome;
  contaDoUsuario.cpf = cpf;
  contaDoUsuario.data_nascimento = data_nascimento;
  contaDoUsuario.telefone = telefone;
  contaDoUsuario.email = email;
  contaDoUsuario.senha = senha;

  return res.status(200).json();
};

module.exports = { listarContas, criarConta, atualizarUsuário };
