const Sequelize = require("sequelize");
const sequelize = require("./database");

const ModalidadeDeProposta = sequelize.define(
  "modalidades_de_propostas",
  {
    id_modalidades_de_propostas: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
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

module.exports = ModalidadeDeProposta;
