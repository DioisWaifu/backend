const ModalidadeDeProposta = require('../model/ModalidadeDeProposta');
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.list = async (req, res) => {
  try {
    const data = await ModalidadeDeProposta.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar modalidades de proposta.', detalhes: err });
  }
};

controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de modalidades de proposta ativo.' });
};

module.exports = controllers;
