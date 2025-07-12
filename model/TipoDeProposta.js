const Sequelize = require("sequelize");
const sequelize = require("./database");

const TipoDeProposta = sequelize.define(
  "tipo_de_propostas",
  {
    id_tipo_de_propostas: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    designacao: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = TipoDeProposta;
