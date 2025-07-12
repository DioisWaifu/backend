const TipoDeUtilizador = require('../model/TipoDeUtilizador');
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.list = async (req, res) => {
  try {
    const data = await TipoDeUtilizador.findAll(); 
    res.json({ success: true, data }); 
  } catch (err) {
    res.status(500).json({ success: false, erro: 'Erro ao listar tipos.', detalhes: err });
  }
};

controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de tipos de utilizador ativo.' });
};

module.exports = controllers;
