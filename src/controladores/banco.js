let { contas, depositos, transferencias } = require("../bancodedados");

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
      Mensagem: "O número da conta e o valor são obrigatórios!.",
    });
  }

  const verificarConta = contas.find((conta) => {
    return (conta.id = Number(numero_conta));
  });

  if (!verificarConta) {
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
    data: new Date("yyyy-MM-dd hh:mm:ss"),
    numero_conta: numero_conta,
    valor: valor,
  });

  verificarConta.saldo += valor;

  return res.status(201).json();
};

const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta || isNaN(numero_conta) || !valor || !senha) {
    res.status(400).json({
      Mensagem: "O número da conta, valor e senha são obrigatórios!.",
    });
  }

  const verificarConta = contas.find((conta) => {
    return (conta.id = Number(numero_conta));
  });

  if (!verificarConta) {
    return res
      .status(400)
      .json({ Mensagem: "Esta conta bancária não existe." });
  }

  if (valor <= 0) {
    res.status(400).json({
      Mensagem: "Valor do depósito precisa ser superior a 0.",
    });
  }

  if (senha !== verificarConta.senha) {
    return res.status(400).json({ Mensagem: "Senha incorreta" });
  }

  if (verificarConta.saldo <= valor) {
    return res
      .status(400)
      .json({ Mensagem: "O saldo é inferior ao valor solicitado." });
  }

  saques.push({
    data: new Date("yyyy-MM-dd hh:mm:ss"),
    numero_conta: numero_conta,
    valor,
  });

  verificarConta.saldo -= valor;

  return res.status(200).json();
};

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (
    !numero_conta_origem ||
    isNaN(numero_conta_origem) ||
    !numero_conta_destino ||
    isNaN(numero_conta_destino) ||
    !valor ||
    !senha
  ) {
    res.status(400).json({
      Mensagem:
        "O número da conta de origem, numero da conta de destino, valor e senha são obrigatórios!.",
    });
  }

  const verificarContaOrigem = contas.find((conta) => {
    return (conta.id = Number(numero_conta));
  });

  if (!verificarContaOrigem) {
    return res
      .status(400)
      .json({ Mensagem: "A conta bancária de origem não existe." });
  }

  const verificarContaDestino = contas
    .filter((conta) => {
      return conta.id !== Number(numero_conta);
    })
    .find((conta) => {
      return (conta.id = Number(numero_conta));
    });

  if (!verificarContaDestino) {
    return res
      .status(400)
      .json({ Mensagem: "A conta bancária de destino não existe." });
  }

  if (valor <= 0) {
    res.status(400).json({
      Mensagem: "Valor da transferência precisa ser superior a 0.",
    });
  }

  if (senha !== verificarContaOrigem.senha) {
    return res.status(400).json({ Mensagem: "Senha incorreta" });
  }

  if (verificarContaOrigem.saldo <= valor) {
    return res.status(400).json({
      Mensagem:
        "Saldo insuficiente. O saldo é inferior ao valor solicitado para transferência.",
    });
  }

  transferencias.push({
    data: new Date("yyyy-MM-dd hh:mm:ss"),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  });

  verificarContaOrigem -= valor;
  verificarContaDestino += valor;

  return res.status(200).json();
};

const exibirSaldo = (req, res) => {
  const { numero_conta, senha } = req.query;

  const verificarConta = contas.find((conta) => {
    return (conta.id = Number(numero_conta));
  });

  if (!verificarConta) {
    return res
      .status(400)
      .json({ Mensagem: "Esta conta bancária não existe." });
  }

  if (senha !== verificarConta.senha) {
    return res.status(400).json({ Mensagem: "Senha incorreta" });
  }

  return res.status(200).json(verificarConta.saldo);
};

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuário,
  deletarConta,
  depositar,
  sacar,
  transferir,
  exibirSaldo,
};
