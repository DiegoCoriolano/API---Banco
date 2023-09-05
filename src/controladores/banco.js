let { contas, depositos } = require("../bancodedados");

const listarContas = (req, res) => {
  if (contas.length === 0) {
    return res.status(204).json(contas);
  }
  return res.status(200).json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

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

  let contadorID = contas.length === 0 ? 1 : contas[contas.length - 1].id + 1;

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

  const { id } = req.params;
  const verificaID = contas.find((conta) => {
    return conta.id === Number(id);
  });

  if (!verificaID || isNaN(id)) {
    return res.status(404).json({
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

const deletarConta = (req, res) => {
  const { numeroConta } = req.params;
  const verificaID = contas.find((conta) => {
    return conta.id === Number(numeroConta);
  });

  if (!verificaID || isNaN(numeroConta)) {
    return res.status(404).json({
      Mensagem: "Esta conta não existe ou o ID é inválido. Insira outro ID.",
    });
  }

  if (verificaID.saldo !== 0) {
    return res
      .status(400)
      .json({ Mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  contas = contas.filter((conta) => {
    return conta.id !== Number(numeroConta);
  });

  return res.status(200).json();
};

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  if (!numero_conta || isNaN(numero_conta) || !valor) {
    res.status(400).json({
      Mensagem:
        "Número da conta inválido. O número da conta e o valor são obrigatórios!.",
    });
  }

  const contaASeDepositar = contas.find((conta) => {
    return (conta.id = Number(numero_conta));
  });

  if (!contaASeDepositar) {
    return res
      .status(400)
      .json({ Mensagem: "Esta conta bancária não existe." });
  }

  if (valor <= 0) {
    res.status(400).json({
      Mensagem: "Valor do depósito precisa ser superior a 0.",
    });
  }

  depositos.push({
    data: new Date(),
    numero_conta: numero_conta,
    valor: valor,
  });

  contaASeDepositar.saldo += valor;

  return res.status(201).json();
};

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuário,
  deletarConta,
  depositar,
};
