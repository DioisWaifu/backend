const RegimeDeProposta = require('../model/RegimeDeProposta');
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de regimes de proposta ativo.' });
};
controllers.list = async (req, res) => {
  try {
    const data = await RegimeDeProposta.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar regimes de proposta.', detalhes: err });
  }
};



module.exports = controllers;
