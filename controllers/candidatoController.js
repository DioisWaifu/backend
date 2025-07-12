
const Candidato = require('../model/Candidato');
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.list = async (req, res) => {
  try {
    const data = await Candidato.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar candidatos.', detalhes: err });
  }
};

controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de candidatos ativo.' });
};

module.exports = controllers;
