const verificarSenha = (req, res, next) => {
  const { senha_banco } = req.query;
  const { banco } = require("../bancodedados");

  if (!senha_banco) {
    return res
      .status(400)
      .json({ Mensagem: "Por favor, informe a senha do banco" });
  }

  if (senha_banco === banco.senha) {
    next();
  } else {
    return res.status(403).json({ Mensagem: "Senha incorreta." });
  }
};

module.exports = { verificarSenha };
