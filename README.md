![](https://i.imgur.com/4LXu4e8.png)

# 🏦 API Bank 

Uma API de Banco criada em Node.js e Express por mim, _Diego Coriolano_, **Desenvolvedor Backend**, para o desafio do módulo 02 do curso de Desenvolvimento de Software da Cubos Academy.

## ✔️ Pré-requisitos

![Node.js](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-4000BF.svg?style=for-the-badge&logo=Insomnia&logoColor=white)

## 👨🏻‍💻 Como instalar:

1. Clone este repositório para sua máquina.

```
git clone https://github.com/DiegoCoriolano/API---Banco.git
```

2. Acesse o repositório em sua máquina

```
cd API---Banco
```

3. Instale as dependências através do NPM

```
npm install
```

---

## 🗒️ Funções

- Listar usuários de contas bancárias
- Criar usuário
- Atualizar usuário da conta bancária
- Remover usuário conta bancária
- Depositar valor
- Sacar valor
- Transferir valor entre contas
- Exibir saldo
- Extrato bancário

---

## 🔵 Endpoints para utilização da API

GET - Listar contas bancárias
```
"localhost:3000/contas?senha_banco=Cubos123Bank"
```
POST - Criar usuário
```
"localhost:3000/contas"
```
PUT - Atualizar usuário
```
"localhost:3000/contas/:numeroConta/usuario"
```
DELETE - Remover usuário
```
"localhost:3000/contas/:numeroConta"
```
POST - Depositar valor
```
"localhost:3000/transacoes/depositar"
```
POST - Sacar valor
```
"localhost:3000"/transacoes/sacar"
```
POST - Transferir valor
```
"localhost:3000/transacoes/transferir"
```
GET - Exibir saldo
```
localhost:3000"/contas/saldo"
```
GET - Extrato bancário
```
"localhost:3000/contas/extrato"
```

### 🔴 Parâmetros dos Endpoints

- Em Listar Contas, a senha do banco deve ser informada - **Cubos123Bank** - como query params, na URL do endpoint. Segue o exemplo:
```
"localhost:3000/contas?senha_banco=Cubos123Bank"
```
- Em **_Criar Conta_** e **_Atualizar Conta_**, os campos são obrigatórios e devem ser passados através do corpo (body) da requisição. Segue o exemplo:
```
{
    "nome": "Diego",
    "cpf": "00021172213",
    "data_nascimento": "2000-03-15",
    "telefone": "71999998685",
    "email": "diego@cubos.com",
    "senha": "12345"
}
```

- Em **_Depositr_**, é necessário passar o número da conta e valor, no corpo (body) da requisição. Segue o exemplo:
```
{
    "numero_conta":"1",
	"valor": 2000
}
```

- Em **_Sacar_**, é necessário passar o número da conta, valor e senha do usuário, que foi criada no momento de **_Criar Conta_**. Segue o exemplo:
```
{
    "numero_conta":"1",
	"valor": 1000,
	"senha":"12345"
}
````

- Em **_Transferir_**, é necessário passar o número da conta de origem, o numero da conta de destino, valor e senha do usário, que foi criada no momento de **_Criar Conta_**. Segue o exemplo:
```
{
    "numero_conta_origem":"2",
	"numero_conta_destino":"1",
	"valor": 2000,
	"senha":"12345"
}
```

- Em **_Exibir Saldo_** e **_Extrato_** é necessário passar o número da conta e senha, como query params, na URL do Endpoint. Segue o exemplo:
```
localhost:3000/contas/saldo?numero_conta=1&senha=12345

localhost:3000/contas/extrato?numero_conta=1&senha=12345
```

## 📽️ Utilização dos Endpoints.

Segue o exemplo de utilização dos endpoints realizados através do Insomnia.

![Insomnia - Utilização de endpoints](https://i.imgur.com/iQ9eGny.gif)






