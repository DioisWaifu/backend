const Sequelize = require("sequelize");
const sequelize = require("./database");

const Competencia = sequelize.define(
  "competencias",
  {
    id_competencias: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    designacao: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Competencia;
