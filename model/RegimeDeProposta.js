const Sequelize = require("sequelize");
const sequelize = require("./database");

const RegimeDeProposta = sequelize.define(
  "regimes_de_propostas",
  {
    id_regimes_de_propostas: {
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

module.exports = RegimeDeProposta;
