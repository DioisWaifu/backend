const Departamento = require('../model/Departamento');
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de departamentos ativo.' });
};

controllers.list = async (req, res) => {
  try {
    const data = await Departamento.findAll();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar departamentos.', detalhes: err });
  }
};

module.exports = controllers;
