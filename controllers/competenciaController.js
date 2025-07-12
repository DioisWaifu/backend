const Competencia = require('../model/Competencia');
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.list = async (req, res) => {
  try {
    const data = await Competencia.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar competências.', detalhes: err });
  }
};

controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de competências ativo.' });
};

module.exports = controllers;
