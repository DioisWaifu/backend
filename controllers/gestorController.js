const Gestor = require('../model/Gestor');
const Departamento = require('../model/Departamento'); 
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de gestores ativo.' });
};

controllers.list = async (req, res) => {
  try {
    const data = await Gestor.findAll({
      include: [{ model: Departamento, as: 'departamento' }],
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar gestores.', detalhes: err });
  }
};

module.exports = controllers;
