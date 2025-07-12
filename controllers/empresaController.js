const Empresa = require('../model/Empresa');
const sequelize = require('../model/database');

const controllers = {};

sequelize.sync();

controllers.list = async (req, res) => {
  try {
    const empresas = await Empresa.findAll();
    res.status(200).json({
      success: true,
      message: "Empresas listadas com sucesso",
      data: empresas
    });
  } catch (error) {
    console.log("Erro:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao listar empresas",
      error: error.message
    });
  }
};



controllers.test = (req, res) => {
  res.json({ mensagem: 'Controlador de empresas ativo.' });
};

module.exports = controllers;
