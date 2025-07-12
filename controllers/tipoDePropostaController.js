const TipoDeProposta = require('../model/TipoDeProposta');
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.list = async (req, res) => {
  try {
    const data = await TipoDeProposta.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar tipos de proposta.', detalhes: err });
  }
};

controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de tipos de proposta ativo.' });
};

module.exports = controllers;
