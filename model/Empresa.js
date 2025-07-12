const Sequelize = require("sequelize");
const sequelize = require("./database");

const Empresa = sequelize.define(
  "empresas",
  {
    id_empresas: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    contacto: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    localizacao: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },

    descricao: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },

    website: {
      type: Sequelize.STRING(350),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Empresa;
